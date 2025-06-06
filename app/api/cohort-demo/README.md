# Cohort Demo API Endpoint

This API endpoint integrates with Brevo to handle the cohort demo form submissions.

## Setup

1. **Get your Brevo API credentials:**
   - Log in to your [Brevo account](https://app.brevo.com/)
   - Go to Settings > SMTP & API > API Keys
   - Create a new API key or use an existing one

2. **Create a contact list (optional):**
   - In Brevo, go to Contacts > Lists
   - Create a new list for marketing contacts (e.g., "HyperPerfect Interest")
   - Note the List ID

3. **Create an email template (optional):**
   - In Brevo, go to Campaigns > Email Templates
   - Create a transactional template for the cohort file delivery
   - Note the Template ID

4. **Configure environment variables:**
   Update `.env.local` with your Brevo credentials:
   ```
   BREVO_API_KEY=your_actual_api_key
   BREVO_LIST_ID=your_list_id (optional)
   BREVO_TEMPLATE_ID=your_template_id (optional)
   ```

## How it works

1. When a user submits the form, the API:
   - Creates or updates the contact in Brevo
   - Sets custom attributes (COHORT_DEMO_REQUESTED, COHORT_DEMO_DATE, ACCEPT_MARKETING)
   - If `acceptMarketing` is true and a list ID is provided, adds the contact to the marketing list
   - Sends a transactional email with the download link

2. The email includes:
   - Download link for the cohort analysis file
   - Additional HyperPerfect information if marketing was accepted

## Testing

Test the endpoint locally:
```bash
curl -X POST http://localhost:3000/api/cohort-demo \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","acceptMarketing":true}'
```

## Custom Attributes in Brevo

The following custom attributes are set on contacts:
- `COHORT_DEMO_REQUESTED`: Boolean indicating they requested the demo
- `COHORT_DEMO_DATE`: ISO timestamp of when they requested it
- `ACCEPT_MARKETING`: Boolean indicating if they want to receive marketing emails