      'use client'

import { useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting to sign in...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Sign in error:', error)
        throw error
      }

      if (!data?.user) {
        console.error('No user data returned')
        throw new Error('Invalid credentials')
      }

      // Wait for session to be fully established
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Validate session with server
      const validationResponse = await fetch('/api/auth/session', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!validationResponse.ok) {
        console.error('Session validation failed after sign in')
        throw new Error('Session validation failed')
      }

      const responseText = await validationResponse.text()
      if (!responseText) {
        throw new Error('Empty response from session validation')
      }

      try {
        const { session } = JSON.parse(responseText)
        if (!session) {
          throw new Error('No session returned')
        }
        // parseError variable removed since it wasn't being used

        console.log('Sign in successful, redirecting...')
        window.location.href = searchParams.get('returnUrl') || '/dashboard'
      } catch (parseError) {
        console.error('Failed to parse session response:', responseText)
        throw new Error('Invalid session data')
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-primary pt-20">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-primary">
            Sign in to your account
          </h2>
          {searchParams.get('message') && (
            <p className="mt-2 text-center text-sm text-secondary">
              {searchParams.get('message')}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#004AAD] hover:bg-[#004AAD]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004AAD] ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link href="/auth/signup" className="font-medium text-secondary hover:text-secondary-hover">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}
