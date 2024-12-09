import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('corebill_token');

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    await fetch(`${process.env.COREBILL_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    // Create a response
    const response = NextResponse.json({ success: true });
    
    // Delete the cookie
    response.cookies.delete('corebill_token');

    return response;
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
