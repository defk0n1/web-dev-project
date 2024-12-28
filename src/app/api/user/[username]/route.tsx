import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { platform } from 'os';


// GET handler to fetch the user based on session email
export async function GET(req: Request, { params }: { params: { username: string } }) {
  try {
    const userName = await params.username
    // Fetch the user based on session email
    const user = await prisma.user.findFirst({
      where : {
        username : userName
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        fullName:true,
        socials:true

        // Select only the fields you want to expose
        // Exclude sensitive information
      },
    });

    // If no user is found, return a 404 response
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log(user)

    // Return user data
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching user:', error);

    // Handle different types of errors
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}