import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { username: string } })  {
  try {
    // Retrieve the session


    // If there's no session or user, return unauthorized    
    
    const userName = await params.username
    // Fetch the user based on session email
    const user = await prisma.user.findFirst({
      where : {
        username : userName
      }
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
      privacy:"PUBLIC"
      
      
    },
    select:{
      id:true,
      title:true,
      description:true,
      privacy:true,
      userId:true,
      user:true
    }
    })

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
