import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  // State declarations
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const fileInputRef = useRef(null);

  const { id } = useParams();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
  const PROFILE_ENDPOINT = `${API_BASE_URL}/profile.php`;

  // Get token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PROFILE_ENDPOINT}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProfile(response.data);
      setFormData(response.data);
      setPreviewImage(response.data.image);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load profile data.');
    } finally {
      setIsLoading(false);
    }
  }, [id, token, PROFILE_ENDPOINT]);

  // Fetch profile when token or id changes
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [fetchProfile, token]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      isNaN(formData.age) ||
      isNaN(formData.weight) ||
      isNaN(formData.height)
    ) {
      setError('Please fill in all fields with valid values.');
      setIsLoading(false);
      return;
    }

    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        image: formData.image,
      };

      // Include password only if it's not empty
      if (formData.password) {
        updatedData.password = formData.password;
      }

      const response = await axios.put(
        `${PROFILE_ENDPOINT}/${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setEditMode(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl mt-10 shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">{error}</div>
          )}

          {!editMode ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={profile?.image || '/default-profile.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-400"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-profile.png';
                    }}
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {`${profile?.firstName || ''} ${profile?.lastName || ''}`}
                </h2>
                <p className="text-gray-300">{profile?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Age</span>
                  <span className="text-white">{profile?.age}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Weight</span>
                  <span className="text-white">{profile?.weight} kg</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Height</span>
                  <span className="text-white">{profile?.height} cm</span>
                </div>
              </div>

              <button
                onClick={() => setEditMode(true)}
                disabled={isLoading}
                className={`w-full mt-6 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={previewImage || profile?.image || '/default-profile.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-profile.png';
                    }}
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={isLoading}
                    aria-label="Change profile picture"
                    className="absolute bottom-0 right-0 bg-orange-400 text-white rounded-full p-2 hover:bg-orange-500 transition disabled:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isLoading}
                  id="profile-image-input"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Click the camera icon to change photo
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  disabled={isLoading}
                  placeholder="Leave empty to keep current password"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="age" className="block text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    min="1"
                    max="120"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    min="30"
                    max="300"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="height" className="block text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    step="0.1"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    min="100"
                    max="250"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(profile);
                    setPreviewImage(profile?.image);
                  }}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;