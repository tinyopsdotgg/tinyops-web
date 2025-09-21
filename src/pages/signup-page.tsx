import { Link } from 'react-router-dom';
import SignupForm from '../components/signup-form';

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mt-8 flex flex-grow flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-prose text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Join Arma Social
          </h1>
          <p className="text-lg text-gray-700">
            Create an account to start participating in Arma events and connect
            with the community.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
          <SignupForm />
          <span className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
