import { useMutation } from '@tanstack/react-query';

interface UpdateUserPasswordProps {
  currentPassword: string;
  newPassword: string;
}

export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: UpdateUserPasswordProps) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/password`,
        {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          method: 'PATCH',
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
    },
  });
}
