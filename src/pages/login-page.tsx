import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useLogin } from '../hooks/auth/use-login';
import { useAuth } from '../hooks/auth/use-auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const login = useLogin();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return;

    await login.mutateAsync({ username, password });
    navigate('/');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mt-8 flex flex-grow flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-prose text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-700">
            Sign in to access your Arma Social account and join the community.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg"
          onSubmit={handleLogin}
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              disabled={login.isPending}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              disabled={login.isPending}
            />
          </div>

          {login.error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {login.error instanceof Error
                ? login.error.message
                : 'Login failed. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="flex items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
          >
            {login.isPending ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          <span className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
