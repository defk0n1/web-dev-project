import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const request = await req.json(); // New title from the request body
  console.log(request);

  const title = request.newValue;

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'Invalid title provided' }, { status: 400 });
  }

  try {
    const wishlistId = parseInt(await params.id, 10);

    // Update the wishlist title
    const updatedWishlist = await prisma.wishlist.update({
      where: { id: wishlistId },
      data: { title },
    });

    return NextResponse.json(
      { message: 'Wishlist title updated successfully', wishlist: updatedWishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating wishlist title:', error);
    return NextResponse.json({ error: 'An error occurred while updating the wishlist title' }, { status: 500 });
  }
}

