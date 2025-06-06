import { NextRequest, NextResponse } from 'next/server'

// Initialize Brevo
const brevoApiKey = process.env.BREVO_API_KEY || ''
const marketingListId = process.env.BREVO_MARKETING_LIST_ID ? parseInt(process.env.BREVO_MARKETING_LIST_ID) : 0
const fileOnlyListId = process.env.BREVO_FILE_ONLY_LIST_ID ? parseInt(process.env.BREVO_FILE_ONLY_LIST_ID) : 0
const brevoTemplateId = process.env.BREVO_TEMPLATE_ID ? parseInt(process.env.BREVO_TEMPLATE_ID) : 0

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

    // Send transactional email with the cohort analysis file
    const emailData = {
      to: [{ email }],
      sender: { 
        email: 'noreply@hyperperfect.ai',
        name: 'HyperPerfect'
      },
      subject: 'Your Cohort Analysis File is Ready',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a7bff;">Your Cohort Analysis File is Ready!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for your interest in the quarterly retention cohort analysis.</p>
          <div style="margin: 30px 0;">
            <a href="${COHORT_FILE_URL}" style="background-color: #1a7bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Download Your Cohort Analysis
            </a>
          </div>
          ${acceptMarketing ? `
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <h2 style="color: #333;">Learn More About HyperPerfect</h2>
            <p>Since you expressed interest in learning about HyperPerfect, we'll send you some helpful information about how our Excel add-in can automate your revenue analytics workflows.</p>
            <p>In the meantime, you can:</p>
            <ul>
              <li><a href="https://publish.obsidian.md/hyperperfect/Quick+Start">Read our Quick Start Guide</a></li>
              <li><a href="https://www.loom.com/share/4ec4b69c39ab45c2bfc80a5ea914a3f7?sid=a36dbc55-6efb-4a90-bee8-7a6d3b2d3bba">Watch a 3-minute demo</a></li>
              <li><a href="https://calendly.com/di-hyperperfect/30min">Book a personalized demo</a></li>
            </ul>
          ` : ''}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            © 2024 HyperPerfect. All rights reserved.
          </p>
        </div>
      `,
      // If you have a transactional template ID, use it instead
      ...(brevoTemplateId ? {
        templateId: brevoTemplateId,
        params: {
          DOWNLOAD_URL: COHORT_FILE_URL,
          ACCEPT_MARKETING: acceptMarketing
        }
      } : {})
    }

    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Failed to send email:', errorData)
      throw new Error('Failed to send email')
    }

    // Determine redirect URL based on user choice
    const redirectUrl = acceptMarketing 
      ? 'https://publish.obsidian.md/hyperperfect/User+Guide'  // Marketing opt-in → User Guide
      : 'https://hyperperfect.ai'  // File only → Main site

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      downloadUrl: COHORT_FILE_URL,
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