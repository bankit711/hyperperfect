# Data Security Overview

**Last revised –Jun 2025**


All HyperPerfect services are built as a Microsoft Office Add-in and inherit the security benefits of the Office platform, with additional security measures implemented for AI integrations.

## Infrastructure & Platform Security

HyperPerfect operates within the secure Microsoft Office environment:
- **Microsoft Office Add-in Platform** provides sandboxed execution environment
- **Office.js API** ensures secure communication between add-in and Excel
- **Azure Static Web Apps** hosts the add-in with enterprise-grade security
- **No backend database** - all data processing happens client-side or via AI APIs

## Data Storage & Retention

### Local Storage Only
- **No cloud storage** of user spreadsheet data
- **Session-only memory** for sensitive information (API keys, auth tokens)
- **Office Runtime Storage** for non-sensitive settings only
- **No persistent databases** containing user data

### Data Retention Periods
- **API Keys**: 8-hour session timeout (memory only, encrypted in transit)
- **Auth Tokens**: 7-day maximum (sessionStorage)
- **Email Authorization & Anonymous Usage Metrics**: No automatic expiration
- **User Spreadsheet Data**: Never stored by HyperPerfect

## Authentication & Authorization

### Single Sign-On (SSO)
- **Microsoft Identity Platform** for primary authentication
- **OAuth 2.0** with proper scope limitations
- **JWT validation** on all authenticated requests
- **Email allowlist verification** against authorized users

### API Key Management
- **Session-only storage** - never persisted to disk
- **Encrypted in transit** to AI providers
- **User-managed** - users control their own API keys
- **No shared credentials** between users

## AI Provider Integration Security

### Data Transmission
- **HTTPS encryption** for all API communications
- **Direct client-to-provider** connections (no proxy storage)
- **Minimal data exposure** - only necessary data sent
- **No data logging** of actual content (only metadata)

### Provider-Specific Security
- **OpenAI**: SOC 2 compliant, 30-day data retention
- **Anthropic**: No data retention for API calls
- **Azure OpenAI**: Enterprise data agreements available
- **Google Gemini**: Configurable retention policies

## Security Best Practices

### Input Validation
- **Parameterized operations** to prevent injection attacks
- **Size limits** on data processing (10MB sheets)
- **Content validation** before AI processing
- **Sanitized error messages** to prevent information leakage

### Access Control
- **Document-level isolation** - each Excel file is separate
- **No cross-document access** between sessions
- **User-specific settings** with proper isolation
- **Admin consent required** for organizational deployment

## Compliance & Privacy

### Data Protection
- **No PII collection** by HyperPerfect
- **User-controlled data flow** - explicit actions required
- **Transparent AI usage** - users see what's sent
- **Right to deletion** - users can remove all stored settings

### Third-Party Services
- **Mixpanel Analytics**: Anonymous usage metrics only
- **Airtable/Brevo**: Email authorization lists only
- **AI Providers**: Subject to their individual privacy policies

## Security Contact
For security concerns or to report vulnerabilities:
- Email: help@hyperperfect.ai

## User Responsibilities
Users should:
- **Review AI provider policies** before sending sensitive data
- **Avoid sending PII** without proper data agreements
- **Use appropriate AI providers** for their security requirements
- **Keep API keys secure** and rotate them regularly

## Data Deletion
Users can delete their data by:
- **Clearing browser storage** (removes all settings)
- **Deleting .email-cache.json** file (removes email cache)
- **Uninstalling the add-in** (removes all local data)
- **Contacting support** for assistance with data removal