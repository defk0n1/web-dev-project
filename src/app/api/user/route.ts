// app/api/users/route.ts
"use server"

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]/options'; // Update with the path to your NextAuth options
import { prisma } from '@/lib/prisma';
import { platform } from 'os';


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
 
    // Decode the email from the session
    const email = session.session.user.email;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
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

// Optional: Implement other HTTP methods as needed
export async function PUT(request: NextRequest) {
  try {
    // Retrieve the session
    const session = await getServerSession(options);

    // If there's no session or email, return unauthorized
    if (!session?.session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Decode the email from the session
    const email = session.session.user.email;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user is found, return a 404 response
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Parse the request data
    const newData = await request.json();
    const { username, fullName, socials } = newData;

    console.log(user.id)

    // Validate `socials` if present
    if (socials && Array.isArray(socials)) {
      const validPlatforms = ['tiktok', 'facebook', 'linkedin', 'instagram'];

      const isValid = socials.every(
        (social: any) =>
          typeof social.platform === 'string' &&
          validPlatforms.includes(social.platform) &&
          typeof social.url === 'string'
      );

      if (!isValid) {
        return NextResponse.json(
          { message: 'Invalid social links data' },
          { status: 400 }
        );
      }

      // for (const social of socials) {
      //   // Try to update the existing social link
      //   const updatedLink = await prisma.socialLink.upsert({
      //     where: {
      //       platform_userId: {
      //         platform: social.platform, // Use composite key
      //         userId: user.id,
      //       },
      //     },
      //     update: {
      //       url: social.url, // Update the URL if the link exists
      //     },
      //     create: {
      //       platform: social.platform, // Create new if not found
      //       url: social.url,
      //       userId: user.id,
      //     },
      //   });
      
      //   console.log('Updated or created social link:', updatedLink);
      // }
      await prisma.socialLink.deleteMany({
        where: { userId: user.id },
      });

      // Create the new social links
      const createdSocialLinks = await Promise.all(
        socials.map((social: any) =>
          prisma.socialLink.create({
            data: {
              platform: social.platform, // Ensure platform is in the correct case
              url: social.url,
              userId: user.id, // Link social to the user
            },
          })
        )
      );

      console.log('Created new socials:', createdSocialLinks);
    }

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { username, fullName },
    });

    // Return the updated user data
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);

    // Handle different types of errors
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
