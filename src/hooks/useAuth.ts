import { useState, useEffect, useCallback } from 'react';
import {
  adminLogin,
  tryAutoLogin,
  saveCreds,
  clearCreds,
  type SavedCreds,
} from '../services/auth';

export interface AuthState {
  username: SavedCreds | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthState {
  const [username, setUsername] = useState<SavedCreds | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to auto-login from stored credentials on mount
  useEffect(() => {
    tryAutoLogin()
      .then((creds) => {
        setUsername(creds);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const login = useCallback(async (u: string, p: string) => {
    await adminLogin(u, p);
    const creds: SavedCreds = { username: u, password: p };
    saveCreds(u, p);
    setUsername(creds);
  }, []);

  const logout = useCallback(() => {
    clearCreds();
    setUsername(null);
  }, []);

  return { username, loading, login, logout };
}