import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../auth/use-auth';

type RegisterInput = {
  username: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  user: {
    id: string;
    username: string;
  };
};

async function registerUser(input: RegisterInput): Promise<RegisterResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      credentials: 'include', // Important for cookies
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }

  return response.json();
}

export function useRegister() {
  const { setUser } = useAuth();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}
