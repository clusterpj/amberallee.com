'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiConfig } from '@/config/corebill'

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
          username: email, 
          password: password 
        })
      });

      console.log('Login Response Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login Error:', errorData);
        throw new Error(errorData.message || 'Login failed')
      }

      const { token, role } = await response.json();
      
      // Set token in localStorage (more secure than cookies)
      localStorage.setItem('corebill_token', token);
      localStorage.setItem('corebill_role', role);
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      console.error('Login Error:', err);
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
