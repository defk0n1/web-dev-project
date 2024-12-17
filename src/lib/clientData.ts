import cacheReval from '@/app/actions'

export async function AddWish(formData: any , wishlistId:any) {
    const apiUrl = `/api/wishlist/${wishlistId}`; // The API endpoint to fetch user data
    console.log(apiUrl)
    try {
        console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Forward cookies or other headers for session-based authentication if needed
        },
        next:{tags : ['Wishlists']},
        cache: "force-cache",
        body: JSON.stringify(formData)
      });
  
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user wishlists');
      }
  
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error fetching user wishlists:', error);
      throw error;
    }
  }
  

export async function UpdateWish(formData: any , wishlistId:any , wishId:any) {
    const apiUrl = `/api/wishlist/${wishlistId}/${wishId}`; // The API endpoint to fetch user data
    console.log(apiUrl)
    try {
      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Forward cookies or other headers for session-based authentication if needed
        },
        next:{tags : ['Wishes']},
        cache: "force-cache",
        body: JSON.stringify(formData)
      });
  
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user wishlists');
      }
  
      const data = await response.json();
      cacheReval("Wishes")
      return data;
    } catch (error) {
      console.error('Error fetching user wishlists:', error);
      throw error;
    }
  }


  export async function DeleteWish(wishlistId:any , wishId:any) {
    const apiUrl = `/api/wishlist/${wishlistId}/${wishId}`; // The API endpoint to fetch user data
    console.log(apiUrl)
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Forward cookies or other headers for session-based authentication if needed
        },
        next:{tags : ['Wishes']},
        cache: "force-cache",
      });
  
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user wishlists');
      }
  
      const data = await response.json();
      cacheReval("Wishes")
      return data;
    } catch (error) {
      console.error('Error fetching user wishlists:', error);
      throw error;
    }
  }
  