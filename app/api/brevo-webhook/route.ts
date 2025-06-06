import { NextRequest, NextResponse } from 'next/server'

// This webhook can be used to track email events from Brevo
// Configure this URL in Brevo: Settings > Webhook > Transactional

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the webhook event
    console.log('Brevo webhook received:', JSON.stringify(body, null, 2))
    
    // Handle different event types
    switch (body.event) {
      case 'delivered':
        console.log(`Email delivered to ${body.email}`)
        // You could update your database, analytics, etc.
        break
        
      case 'opened':
        console.log(`Email opened by ${body.email}`)
        break
        
      case 'clicked':
        console.log(`Link clicked by ${body.email}: ${body.link}`)
        break
        
      case 'bounced':
        console.log(`Email bounced for ${body.email}: ${body.reason}`)
        break
        
      case 'spam':
        console.log(`Email marked as spam by ${body.email}`)
        break
        
      case 'unsubscribed':
        console.log(`${body.email} unsubscribed`)
        break
        
      default:
        console.log(`Unknown event type: ${body.event}`)
    }
    
    // Always return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Error processing Brevo webhook:', error)
    // Still return 200 to prevent Brevo from retrying
    return NextResponse.json({ received: true })
  }
}