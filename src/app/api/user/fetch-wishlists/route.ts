// app/api/wishlists/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../../auth/[...nextauth]/options'; // Update with the path to your NextAuth configuration

export async function GET(request: NextRequest) {
  try {
    // Retrieve the session
    const session = await getServerSession(options);
    console.log("wishlist test: " , session)

    // If there's no session or user, return unauthorized
    if (!session?.session.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
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

    const wishlists = await prisma.wishlist.findMany({
      where:{
      user: {
        id: user?.id, // Match the user's id
      },
    }})

    console.log(wishlists)

    if(!wishlists){
      return NextResponse.json(
        { message: 'No wishlists found' },
        { status: 500 }
      );


    }



    // Return the created wishlist
    return NextResponse.json(wishlists, { status: 201 });
  } catch (error) {
    console.error('Error fetching wishlists:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
