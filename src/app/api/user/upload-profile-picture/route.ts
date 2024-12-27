import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { uploadProfilePicture } from '@/lib/uploadToCloudinary'
import { updateUserProfilePicture } from '@/lib/prisma'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(options);
    
    if (!session.session || !session.session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where:{
        email: session?.session.user.email
      },
      select:{
        id:true
      }
    })

    console.log(currentUser)

    // Get the file from the request
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log(session)
    if(currentUser){
    // Upload to Cloudinary and update user profile
    const profilePictureUrl = await uploadProfilePicture(buffer, currentUser.id);

    console.log(profilePictureUrl)
    await updateUserProfilePicture(currentUser.id, profilePictureUrl);
    

    return NextResponse.json({ 
      message: 'Profile picture uploaded successfully', 
      imageUrl: profilePictureUrl 
    });
  }
  else{
    return NextResponse.json({ 
      message: 'Profile picture upload error', 
    });
  }
  } catch (error) {
    console.error('Profile picture upload error:', error);
    return NextResponse.json({ error: 'Failed to upload profile picture' }, { status: 500 });
  }
}


