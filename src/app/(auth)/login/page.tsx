'use client'

import { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/proxy/login', {
        method: 'POST',
        credentials: 'include', // Important for CORS with credentials
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      });

      console.log('Login Response Status:', response.status);

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const textResponse = await response.text();
        console.error('Non-JSON Response:', textResponse);
        throw new Error('Server returned invalid response format');
      }

      if (!response.ok) {
        throw new Error(responseData.error || 'Login failed: Server returned an error');
      }

      const { type, token, role, user } = responseData;
      
      // Set token in localStorage with type and role
      localStorage.setItem('corebill_token', token);
      localStorage.setItem('corebill_token_type', type);
      localStorage.setItem('corebill_role', role.toLowerCase());
      localStorage.setItem('corebill_user_id', user?.id || '');
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      console.error('Login Error:', err);
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-pink-200">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Author Portal
          </h2>
          <p className="text-pink-600 italic">Amber Allee</p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {error && <p className="text-rose-500 text-center bg-rose-50 p-2 rounded">{error}</p>}
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="appearance-none relative block w-full px-4 py-3 border border-pink-200 placeholder-pink-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/50"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none relative block w-full px-4 py-3 border border-pink-200 placeholder-pink-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/50"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
