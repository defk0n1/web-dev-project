// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options'; // Update with the path to your NextAuth options
import { prisma } from '@/lib/prisma';

// GET handler to fetch the user based on session email
export async function GET(request: Request) {
  try {
    // Retrieve the session
    const session = await getServerSession(options);
    console.log(session)

    // If there's no session or email, return unauthorized
    if (!session?.session.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
 
    // Decode the email from the session
    const email = session.session.user.email;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        wishlists:true

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

    // Return user data
    return NextResponse.json(user, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
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

// Optional: Implement other HTTP methods as needed
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'Method Not Allowed' },
    { status: 405 }
  );
}
