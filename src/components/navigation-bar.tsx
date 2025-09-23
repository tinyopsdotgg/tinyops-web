import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/auth/use-logout';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from './loading-spinner';

export default function NavigationBar() {
  const { logout } = useLogout();
  const { user, isLoading } = useAuth();

  return (
    <nav className="flex w-full items-center justify-between bg-white px-6 py-4 shadow">
      <Link to="/" className="text-2xl font-bold">
        Tiny Ops
      </Link>
      <div className="flex items-center gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : user ? (
          <>
            <span className="text-gray-700">
              Logged in as{' '}
              <span className="font-semibold">{user.username}</span>
            </span>
            <Link to="/settings" className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
            <Link
              to="/create"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Event Post
            </Link>

            <button
              onClick={logout}
              className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
