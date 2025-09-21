import { type ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import type { User } from './user';
import { VerifySessionResponseDtoSchema } from '../dto/verify-session-response.dto';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/session`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!response.ok) throw new Error('Session check failed');

        const data = await response.json();
        const parsedResult = VerifySessionResponseDtoSchema.safeParse(data);

        if (parsedResult.success) {
          setUser(parsedResult.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchSession();
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
