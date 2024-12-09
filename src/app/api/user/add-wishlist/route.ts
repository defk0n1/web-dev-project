// app/api/wishlists/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../../auth/[...nextauth]/options'; // Update with the path to your NextAuth configuration

export async function POST(request: NextRequest) {
  try {
    // Retrieve the session
    const session = await getServerSession(options);
    console.log(session)

    // If there's no session or user, return unauthorized
    if (!session?.session.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    console.log(body)
    const { title, description, privacy } = body;



    // Validate input
    if (!title || !privacy) {
      return NextResponse.json(
        { message: 'Title and privacy are required' },
        { status: 400 }
      );
    }

    // Fetch the user based on session email
    const user = await prisma.user.findUnique({
      where: { email: session.session.user?.email},
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log(user)

 
    // Create a new wishlist
    const wishlist = await prisma.wishlist.create({
        data: {
          title:title,
          description:description,
          privacy: privacy ? "PUBLIC" : "PRIVATE",
          userId: user.id, // Associate the wishlist with the user
        },
      });
    console.log(wishlist)
    // Return the created wishlist
    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error('Error creating wishlist:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
