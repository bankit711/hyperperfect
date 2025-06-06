import { NextRequest, NextResponse } from 'next/server'

// Initialize Brevo
const brevoApiKey = process.env.BREVO_API_KEY || ''
const marketingListId = process.env.BREVO_MARKETING_LIST_ID ? parseInt(process.env.BREVO_MARKETING_LIST_ID) : 0
const fileOnlyListId = process.env.BREVO_FILE_ONLY_LIST_ID ? parseInt(process.env.BREVO_FILE_ONLY_LIST_ID) : 0

// File download URL - this should be the direct download link for the cohort analysis file
const COHORT_FILE_URL = 'https://dingraham.gumroad.com/l/quarterlyretentionfile'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, acceptMarketing } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
      )
    }

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create or update contact in Brevo
    const contactData: any = {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COHORT_DEMO_REQUESTED: true,
        COHORT_DEMO_DATE: new Date().toISOString(),
        ACCEPT_MARKETING: acceptMarketing
      },
      updateEnabled: true
    }

    // Add contact to appropriate list based on their choice
    if (acceptMarketing && marketingListId) {
      // User wants file + marketing info → add to marketing list
      contactData.listIds = [marketingListId]
    } else {
      // User wants file only → add to file-only list
      contactData.listIds = [fileOnlyListId]
    }

    // Create/update contact
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(contactData)
    })

    if (!contactResponse.ok && contactResponse.status !== 409) {
      // 409 means contact already exists, which is fine
      const errorData = await contactResponse.json()
      console.error('Failed to create contact:', errorData)
      throw new Error('Failed to create contact')
    }

    // Email automation will be handled by Brevo workflows

    // Determine redirect URL based on user choice
    const redirectUrl = acceptMarketing 
      ? 'https://publish.obsidian.md/hyperperfect/User+Guide'  // Marketing opt-in → User Guide
      : 'https://hyperperfect.ai'  // File only → Main site

    return NextResponse.json({ 
      success: true,
      message: 'Contact created successfully',
      redirectUrl: redirectUrl
    })

  } catch (error) {
    console.error('Error processing cohort demo request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}