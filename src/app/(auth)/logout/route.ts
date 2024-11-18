import { NextResponse } from 'next/server'
import { apiConfig } from '@/config/corebill'

export async function GET(request: Request) {
  // Clear CoreBill token cookie
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('corebill_token')

  // Optional: Call CoreBill logout endpoint if needed
  try {
    await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.auth.logout}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${request.cookies.get('corebill_token')}`
      }
    })
  } catch (error) {
    console.error('Logout failed:', error)
  }

  return response
}
