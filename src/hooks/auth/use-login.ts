import { useMutation } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { LoginResponseDtoSchema } from '../../dto/login-response.dto';

interface LoginProps {
  username: string;
  password: string;
}

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async ({ username, password }: LoginProps) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      return LoginResponseDtoSchema.parse(data);
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}
