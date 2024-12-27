import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

// GET method handler
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);

  // Ensure user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } 

  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
  }

  try {
    // First, verify the wishlist exists
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: Number(id) },
      select:{
        id:true,
        title:true,
        description:true,
        privacy:true,
        userId:true,
        user:true,
        wishes:true
      }
    });

    if (!wishlist) {
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
    }

    // Optional: Verify that the wishlist belongs to the authenticated user
    // if (wishlist.userId !== session.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized access to wishlist' }, { status: 403 });
    // }

    // Delete the wishlist
    
   

    return NextResponse.json(wishlist, {
        status: 200,
      });  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ error: 'Failed to delete wishlist' }, { status: 500 });
  }
}

// POST method handler
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);

  // Ensure user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } 

  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
  }


  const body = await req.json();


  const { productName, description, retailer } = body;

    // Input validation
    if (!productName || !retailer) {
      return NextResponse.json({ error: 'Product name and retailer are required' },{status:400});
    }

    try {
      // Ensure the wishlist exists
      const wishlist = await prisma.wishlist.findUnique({
        where: { id: parseInt(id) },
      });

      if (!wishlist) {
        return NextResponse.json({ error: 'Wishlist not found' },{status : 400});
      }

      // Create the wish
      const newWish = await prisma.wish.create({
        data: {
          productName,
          description,
          retailer,
          wishlistId: parseInt(id),
        },
      });

      return NextResponse.json(newWish,{ status : 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while adding the wish' },{ status : 500 });
    }

}


