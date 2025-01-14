'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'sonner'

interface PaymentFormProps {
  bookId: string
  price: number
  onSuccess?: () => void
  onCancel?: () => void
}

export function PaymentForm({ bookId, price, onSuccess, onCancel }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      // Validate price
      if (typeof price !== 'number' || price <= 0) {
        throw new Error('Invalid price')
      }

      // Validate bookId
      if (!bookId || typeof bookId !== 'string') {
        throw new Error('Invalid book ID')
      }

      console.log('Creating checkout session for book:', bookId, 'with price:', price)
      
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId,
          price,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment session')
      }

      const { sessionId } = await response.json()
      console.log('Received session ID:', sessionId)

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw error
      }

      onSuccess?.()
    } catch (error) {
      toast.error('Payment failed. Please try again.')
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle>Complete Your Purchase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Total: ${(price / 100).toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
