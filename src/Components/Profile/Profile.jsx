import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://exercises11.p.rapidapi.com/data.json');
      const userData = response.data.results[0];
      const newProfile = {
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        age: userData.dob.age,
        weight: Math.floor(Math.random() * 30) + 60,
        height: Math.floor(Math.random() * 30) + 160,
        image: userData.picture.large
      };
      
      setProfile(newProfile);
      setFormData(newProfile);
      setPreviewImage(userData.picture.large);
    } catch (error) {
      console.error("Error fetching profile:", error);
      const fallbackProfile = {
        name: "BAYISA BALCHA",
        email: "bayedhaf.com",
        age: 28,
        weight: 75.5,
        height: 180,
        image: "https://randomuser.me/api/portraits/men/1.jpg"
      };
      setProfile(fallbackProfile);
      setFormData(fallbackProfile);
      setPreviewImage(fallbackProfile.image);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, ...formData }));
    setEditMode(false);
  };

  if (!profile) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl mt-10 shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {!editMode ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src={profile.image} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-400"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                <p className="text-gray-300">{profile.email}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Age</span>
                  <span className="text-white">{profile.age}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Weight</span>
                  <span className="text-white">{profile.weight} kg</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Height</span>
                  <span className="text-white">{profile.height} cm</span>
                </div>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="w-full mt-6 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={previewImage || profile.image} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 mb-4"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-orange-400 text-white rounded-full p-2 hover:bg-orange-500 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-gray-400 text-sm mt-1">Click the camera icon to change photo</p>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    min="30"
                    max="300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  min="100"
                  max="250"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setPreviewImage(profile.image);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200"
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