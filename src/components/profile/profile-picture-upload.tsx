'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import cacheReval from '@/app/actions';

export function ProfilePictureUpload({image} : any) {
  const { data: session, update } = useSession();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(session)
  console.log(image)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/user/upload-profile-picture', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setPreview(result.imageUrl);

      cacheReval("User")

      if (response.ok) {
        // Update the session with the new profile picture
        await update({
          image: result.imageUrl
        });
        setPreview(result.imageUrl);
      } else {
        setError(result.error || 'Failed to upload profile picture');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="relative group cursor-pointer"
        onClick={triggerFileInput}
      >
        {/* Profile Picture */}
        <Image
          src={image}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full object-cover w-36 h-36 group-hover:opacity-70 transition-opacity"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
            Change Picture
          </span>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload Status */}
      {isUploading && (
        <p className="text-blue-500">Uploading...</p>
      )}

      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}

export default ProfilePictureUpload;
