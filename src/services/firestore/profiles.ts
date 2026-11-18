import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import type { ProfileDoc } from '@/integrations/firebase/types';

function profileRef(userId: string) {
  return doc(db, COLLECTIONS.profiles, userId);
}

export async function getProfile(userId: string): Promise<ProfileDoc | null> {
  const snap = await getDoc(profileRef(userId));
  if (!snap.exists()) return null;
  return snap.data() as ProfileDoc;
}

export async function createProfile(
  userId: string,
  data: { displayName: string; email?: string | null; role?: string | null }
): Promise<void> {
  const now = new Date().toISOString();
  await setDoc(profileRef(userId), {
    displayName: data.displayName,
    email: data.email ?? null,
    role: data.role ?? null,
    createdAt: now,
    updatedAt: now,
  } satisfies ProfileDoc);
}

export async function ensureProfile(
  userId: string,
  data: { displayName: string; email?: string | null }
): Promise<ProfileDoc> {
  const existing = await getProfile(userId);
  if (existing) return existing;

  await createProfile(userId, data);
  return {
    displayName: data.displayName,
    email: data.email ?? null,
    role: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function updateProfile(
  userId: string,
  patch: Partial<Pick<ProfileDoc, 'displayName' | 'role' | 'email'>>
): Promise<void> {
  await updateDoc(profileRef(userId), {
    ...patch,
    updatedAt: new Date().toISOString(),
    _updatedAtServer: serverTimestamp(),
  });
}
