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

      // Clean up the response data by removing PHP warnings
      let responseData;
      try {
        // Find the JSON part in the response (after PHP warnings)
        const jsonStart = response.data.indexOf('{');
        const jsonEnd = response.data.lastIndexOf('}') + 1;
        responseData = JSON.parse(response.data.slice(jsonStart, jsonEnd));
      } catch (Error) {
        console.error('Failed to parse response:', response.data);
        throw new Error('Invalid server response format');
      }

      if (!responseData.token) {
        throw new Error('Authentication token missing in response');
      }

      // Extract user ID - handling both object and string formats
      let userId;
      if (responseData.data?.id) {
        if (typeof responseData.data.id === 'object' && responseData.data.id.oid) {
          userId = responseData.data.id.oid; // MongoDB ObjectId format
        } else {
          userId = responseData.data.id; // String format
        }
      }

      if (!userId) {
        console.warn('User ID not found in response');
      }

      // Store authentication data
      localStorage.setItem('token', responseData.token);
      if (userId) {
        localStorage.setItem('userId', userId);
      }

      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Try to extract error message from the response
        try {
          const jsonStart = error.response.data.indexOf('{');
          const jsonEnd = error.response.data.lastIndexOf('}') + 1;
          const errorData = JSON.parse(error.response.data.slice(jsonStart, jsonEnd));
          errorMessage = errorData.message || errorMessage;
        } catch (error) {
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

          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500 text-white rounded-lg">
              {success}
            </div>
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
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
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
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-bold ${
                isLoading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;