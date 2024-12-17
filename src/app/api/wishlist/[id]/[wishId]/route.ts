import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

// PUT method handler
export async function PUT(req: Request, { params }: { params: { id: string , wishId: any } }) {
  const session = await getServerSession(options);

  // Ensure user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } 

  const { id , wishId } = await params;

  if (!id || isNaN(Number(id)) || !wishId || isNaN(Number(wishId))){
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
    console.log(wishlist)

    const wish = await prisma.wish.findUnique({
      where: { id: Number(wishId) },
      select:{
        id:true,
       
      }
    });



    if (!wish) {
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }
    console.log(wish)


    const body = await req.json();
    console.log(body)
    console.log(wishId , id )

    const { productName, description, retailer } = body;
    const updateWish = await prisma.wish.update({
      where: {
        id: Number(wishId),
      },
      data: {
        productName: productName,
        description: description,
        retailer :retailer
      },
    })



    // Optional: Verify that the wishlist belongs to the authenticated user
    // if (wishlist.userId !== session.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized access to wishlist' }, { status: 403 });
    // }

    // Delete the wishlist
    
   

    return NextResponse.json(updateWish, {
        status: 200,
      });  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  }
}

// DELETE method handler
export async function DELETE(req: Request, { params }: { params: { id: string , wishId: any } }) {
  const session = await getServerSession(options);

  // Ensure user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } 

  const { id , wishId } = await params;

  if (!id || isNaN(Number(id)) || !wishId || isNaN(Number(wishId))){
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
    console.log(wishlist)

    const wish = await prisma.wish.findUnique({
      where: { id: Number(wishId) },
      select:{
        id:true,
       
      }
    });



    if (!wish) {
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }
    console.log(wish)


    

    const deleteWish = await prisma.wish.delete({
      where: {
        id: Number(wishId),
      }
    })



    // Optional: Verify that the wishlist belongs to the authenticated user
    // if (wishlist.userId !== session.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized access to wishlist' }, { status: 403 });
    // }

    // Delete the wishlist
    
   

    return NextResponse.json(deleteWish, {
        status: 200,
      });  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  }
}
