import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://dummyjson.com/c/1445-2c80-484e-9835';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password) {
      setError('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_BASE_URL,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Login successful! Redirecting to your profile...');
      setTimeout(() => {
        navigate(`/profile/${response.data.id}`);
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl mt-10 shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-500 text-white rounded-lg">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="text-center text-white mt-8">
            If you do not have an account, go to{' '}
            <Link className="pl-1 text-blue-300 underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;