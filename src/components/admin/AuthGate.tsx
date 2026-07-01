import { useAuth } from '../../hooks/useAuth';
import LoginScreen from '../../pages/admin/LoginScreen';

interface Props {
  children: React.ReactNode;
}

export function AuthGate({ children }: Props) {
  const { username, loading } = useAuth();

  if (loading) {
    return (
      <div className="login-page">
        <div className="loading-row">
          <div className="spinner" />
          Verifying session…
        </div>
      </div>
    );
  }

  if (!username) return <LoginScreen />;
  return <>{children}</>;
}