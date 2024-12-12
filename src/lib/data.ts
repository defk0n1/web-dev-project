
import { headers } from "next/headers"


export async function fetchUserData() {
  const apiUrl = `${process.env.NEXTAUTH_URL}/api/user`; // The API endpoint to fetch user data
  const headersList = await headers(); // Fetch request headers in a server component


  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward cookies or other headers for session-based authentication if needed
        cookie: headersList.get('cookie') || ''
      },
      next:{tags : ['User']}
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
