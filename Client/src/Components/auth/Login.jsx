import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8080/login.php';

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
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = response.data;

      // Optional: Check if data is a string and try to parse
      let data = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;

      if (!data.token) {
        throw new Error('Authentication token missing in response');
      }

      const userId = data?.data?.id?.oid || data?.data?.id;

      localStorage.setItem('token', data.token);
      if (userId) localStorage.setItem('userId', userId);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';

      if (error.response?.data) {
        try {
          const err = typeof error.response.data === 'string'
            ? JSON.parse(error.response.data)
            : error.response.data;

          errorMessage = err.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${error.response.status}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

          {error && <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-500 text-white rounded-lg">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-bold ${isLoading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
