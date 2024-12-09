import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadProfilePicture(file: Buffer, userId: string) {
  try {
    // Upload to Cloudinary with a specific folder and public ID
    const uploadResponse = await new Promise<{url: string}>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'profile_pictures',
          public_id: `user_${userId}_profile`,
          transformation: [
            { width: 500, height: 500, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as {url: string});
        }
      );
      
      uploadStream.end(file);
    });

    return uploadResponse.url;
  } catch (error) {
    console.error('Profile picture upload error:', error);
    throw new Error('Failed to upload profile picture');
  }
}