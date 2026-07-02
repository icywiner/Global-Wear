import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { logActivity } from '@/lib/activity';

interface AuthState {
  user: User | null;
  session: Session | null;
  displayName: string;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchProfile(session.user.id), 0);
      } else {
        setDisplayName('');
        setIsAdmin(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('display_name, is_admin, is_blocked')
      .eq('user_id', userId)
      .single();
    if (error || !data) return;

    if (data.is_blocked) {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setDisplayName('');
      setIsAdmin(false);
      return;
    }

    setDisplayName(data.display_name || '');
    setIsAdmin(Boolean(data.is_admin));
  }

  function friendlyAuthError(message: string) {
    const normalized = message.toLowerCase();
    if (normalized.includes('invalid login credentials')) return 'Credenciales inválidas. Revisá tu correo y contraseña.';
    if (normalized.includes('email not confirmed')) return 'Confirmá tu email antes de iniciar sesión.';
    if (normalized.includes('blocked')) return 'Tu cuenta está bloqueada. Contactá al administrador.';
    return message;
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (!error) {
      void logActivity('auth_register', { email });
    }
    return { error: error?.message ? friendlyAuthError(error.message) : null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: friendlyAuthError(error.message) };
    }

    if (data.session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_blocked, is_admin, display_name, login_count')
        .eq('user_id', data.session.user.id)
        .single();

      if (profile?.is_blocked) {
        await supabase.auth.signOut();
        return { error: 'Tu cuenta está bloqueada. Contactá al administrador.' };
      }

      await supabase
        .from('profiles')
        .update({
          last_sign_in_at: new Date().toISOString(),
          login_count: (profile?.login_count || 0) + 1,
        })
        .eq('user_id', data.session.user.id);

      setIsAdmin(Boolean(profile?.is_admin));
      setDisplayName(profile?.display_name || data.session.user.user_metadata?.display_name || '');
      void logActivity('auth_login', { email });
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    void logActivity('auth_logout', {});
  };

  return (
    <AuthContext.Provider value={{ user, session, displayName, isAdmin, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
