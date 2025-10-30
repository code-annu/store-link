import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link if using React Router
import { AppRoute } from "../../../router";
import { useAuth } from "../../../application/hooks/auth-hook";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, error } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user) {
      navigateTo(AppRoute.HOME);
    }
  }, [navigateTo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: email, password: password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition duration-150 cursor-pointer"
          >
            Login
          </button>
          {/* Navigation link to signup page */}
          <div className="text-center mt-4">
            <Link
              to={AppRoute.SIGNUP}
              className="text-blue-600 underline hover:text-blue-800 transition duration-150"
            >
              Don't have an account? Sign up
            </Link>
            {error ? <h1 className="text-red-500 mt-2">{error}</h1> : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
