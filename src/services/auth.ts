const CREDS_KEY = '***';

export interface SavedCreds {
  username: string;
  password: string;
}

export function saveCreds(username: string, password: string): void {
  localStorage.setItem(CREDS_KEY, JSON.stringify({ username, password }));
}

export function loadCreds(): SavedCreds | null {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedCreds;
  } catch {
    return null;
  }
}

export function clearCreds(): void {
  localStorage.removeItem(CREDS_KEY);
}

function btoaAuth(username: string, password: string): string {
  return 'Basic ' + btoa(`${username}:${password}`);
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<{ ok: boolean; username: string }> {
  const base =
    import.meta.env.VITE_API_URL ?? 'https://clearbox-api.mileshillary.com';
  const res = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `login_${res.status}`);
  }
  return res.json() as Promise<{ ok: boolean; username: string }>;
}

export async function adminMe(
  username: string,
  password: string,
): Promise<{ username: string }> {
  const base =
    import.meta.env.VITE_API_URL ?? 'https://clearbox-api.mileshillary.com';
  const res = await fetch(`${base}/api/auth/me`, {
    headers: { Authorization: btoaAuth(username, password) },
  });
  if (!res.ok) throw new Error(`auth_${res.status}`);
  return res.json() as Promise<{ username: string }>;
}

export async function tryAutoLogin(): Promise<SavedCreds | null> {
  const creds = loadCreds();
  if (!creds) return null;
  try {
    await adminMe(creds.username, creds.password);
    return creds;
  } catch {
    clearCreds();
    return null;
  }
}