import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    image: '',
  });
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);

  const API_URL = 'http://localhost:8080/register.php';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const triggerImageInput = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    try {
      const response = await axios.post(API_URL, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/Login'), 1500);
        resetForm();
      } else {
        handleResponseErrors(response);
      }
    } catch (err) {
      handleRequestErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: '',
      weight: '',
      height: '',
      image: '',
    });
    setPreviewImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResponseErrors = (response) => {
    if (response.data.errors) {
      setFieldErrors(response.data.errors);
      setError('Please fix the form errors');
    } else {
      setError(response.data.message || 'Registration failed');
    }
  };

  const handleRequestErrors = (err) => {
    console.error('Registration error:', err);
    if (err.response?.data?.errors) {
      setFieldErrors(err.response.data.errors);
      setError('Please fix the form errors');
    } else if (err.code === 'ERR_NETWORK') {
      setError('Cannot connect to server. Please try again later.');
    } else {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Register</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
            {Object.entries(fieldErrors).map(([field, message]) => (
              <p key={field} className="text-sm mt-1">{message}</p>
            ))}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={previewImage || 'https://i.pravatar.cc/300'}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-400"
            />
            <button
              type="button"
              onClick={triggerImageInput}
              className="mt-2 text-sm text-orange-300 underline"
              disabled={isLoading}
            >
              Upload Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.email ? 'border-red-500' : 'border-gray-600'}`}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.password ? 'border-red-500' : 'border-gray-600'}`}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.age ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            <div>
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.weight ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            <div>
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded bg-gray-700 text-white border ${fieldErrors.height ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded bg-orange-400 text-white font-bold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-white mt-8">
          Already have an account?{' '}
          <Link className="text-blue-300 underline" to="/Login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;