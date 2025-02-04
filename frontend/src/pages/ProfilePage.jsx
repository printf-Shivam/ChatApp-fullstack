import React from 'react';
import { Camera, User, Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import {useState} from "react"

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  const [selectedImage, setSelectedImage]= useState(null);

  const handleImageUpload = async (e) => {

    // Image upload handler logic here
    const file = e.target.files[0];
    
    if(!file) return;

    const reader= new FileReader();

    reader.readAsDataURL(file);

    reader.onload=async ()=>{
      const baseImage= reader.result;
      setSelectedImage(baseImage);
      await updateProfile({profilepic:baseImage})
    }
  };

  return (
    <div className=" pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-gray-600">Your profile information</p>
          </div>

          {/* Avatar section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img 
                src={selectedImage||authUser.profilepic || "/avatar.png"}
                alt="profile"
                className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-gray-800 hover:bg-gray-700
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 rounded-lg border border-gray-200">
                {authUser.fullName || 'Not set'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5  rounded-lg border border-gray-200">
                {authUser.email || 'Not set'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;