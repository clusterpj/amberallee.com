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

    // Validate price is a number and matches Stripe's requirements
    if (typeof price !== 'number' || price <= 0 || !Number.isInteger(price)) {
      return NextResponse.json(
        { error: 'Invalid price. Price must be a positive integer in cents' },
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
      
      // Create a new price if one doesn't exist
      let priceId: string
      if (!product.default_price) {
        const price = await stripe.prices.create({
          currency: 'usd',
          product: stripeProductId,
          unit_amount: price,
        })
        priceId = price.id
      } else {
        priceId = typeof product.default_price === 'string' 
          ? product.default_price 
          : product.default_price.id
      }

      console.log('Retrieved Stripe product:', {
        id: product.id,
        name: product.name,
        priceId
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: priceId,
          quantity: 1
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
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
