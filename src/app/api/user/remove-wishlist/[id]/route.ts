import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

// DELETE method handler
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);

  // Ensure user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
  }

  console.log(id)

  try {
    // First, verify the wishlist exists
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: Number(id) },
    });

    console.log(wishlist.wishes)

    if (!wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
    }

    // Optional: Verify that the wishlist belongs to the authenticated user
    // if (wishlist.userId !== session.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized access to wishlist' }, { status: 403 });
    // }

    // Delete the wishlist
    await prisma.wishlist.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Wishlist deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    return NextResponse.json({ error: 'Failed to delete wishlist' }, { status: 500 });
  }
}
