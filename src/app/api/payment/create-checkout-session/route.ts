import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  try {
    const { bookId, price, stripeProductId } = await request.json()
    
    // Validate input
    if (!bookId || typeof bookId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid book ID' },
        { status: 400 }
      )
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      )
    }

    if (!stripeProductId || !stripeProductId.startsWith('prod_')) {
      return NextResponse.json(
        { error: 'Invalid Stripe product ID' },
        { status: 400 }
      )
    }

    console.log('Creating Stripe session for:', {
      bookId,
      price,
      stripeProductId
    })
    
    try {
      // Verify the product exists
      const product = await stripe.products.retrieve(stripeProductId)
      console.log('Retrieved Stripe product:', product)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: stripeProductId,
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
        metadata: {
          bookId,
        },
      })

      console.log('Created Stripe session:', session)
      return NextResponse.json({ sessionId: session.id })
    } catch (error) {
      console.error('Stripe error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        raw: error
      })
      return NextResponse.json(
        { error: 'Failed to create payment session', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      )
  }
}
