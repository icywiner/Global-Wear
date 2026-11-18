import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { ensureProfile, getProfile } from '@/services/firestore/profiles';

interface AuthState {
  user: User | null;
  session: { access_token: string } | null;
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
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setLoading(true);

      if (!nextUser) {
        setSession(null);
        setDisplayName('');
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const token = await nextUser.getIdToken();
        setSession({ access_token: token });

        const profile = await ensureProfile(nextUser.uid, {
          displayName: nextUser.displayName || nextUser.email?.split('@')[0] || 'Usuario',
          email: nextUser.email,
        });

        setDisplayName(profile.displayName || nextUser.displayName || '');
        setIsAdmin(profile.role === 'admin');
      } catch {
        setDisplayName(nextUser.displayName || '');
        setIsAdmin(false);
        setSession(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await ensureProfile(credential.user.uid, {
        displayName: name,
        email: credential.user.email,
      });
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'No se pudo registrar' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'No se pudo iniciar sesión' };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
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

/** Utilidad opcional para refrescar perfil admin tras cambios en Firestore. */
export async function refreshAdminFlag(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.role === 'admin';
}
