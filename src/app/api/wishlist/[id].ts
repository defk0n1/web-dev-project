// app/api/users/route.ts
"use server"

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]/options'; // Update with the path to your NextAuth options
import { prisma } from '@/lib/prisma';


// GET handler to fetch the user based on session email
export async function GET(request: Request) {
  try {
    // Retrieve the session
    const session = await getServerSession(options);
    console.log('current session: ',session)


    // If there's no session or email, return unauthorized
    if (!session?.session.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized'},
        { status: 401 }
      );
    }
 
      const { id } = request.query;
    
      if (request.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
    
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
    
      try {
        const wishlist = await prisma.wishlist.findUnique({
          where: { id: parseInt(id, 10) },
          include: {
            wishes: true, // Include associated wishes
            user: true,   // Include associated user
          },
        });
    
        if (!wishlist) {
          return res.status(404).json({ error: 'Wishlist not found' });
        }
    
        res.status(200).json(wishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
  }
}

// Optional: Implement other HTTP methods as needed
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'Method Not Allowed' },
    { status: 405 }
  );
}
