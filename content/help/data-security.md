---
title: "Data Security"
description: "How HyperPerfect protects your data. Enterprise-grade security with Anthropic Claude's zero-training guarantee."
order: 7
category: "Enterprise"
---

HyperPerfect is designed for financial professionals who need AI-powered Excel assistance without compromising data security or compliance requirements.

## Key Security Principles

**You Control What the AI Sees**
- AI processes only what you explicitly send
- HyperPerfect never scans or accesses your entire workbook
- Powered by Anthropic, the industry leader in data protection
- Your data is never used for training

**Enterprise-Grade Authentication**
- Microsoft Single Sign-On (SSO) integration
- JWT token validation on every request
- Compatible with existing Microsoft 365 security policies

**Data Isolation**
- Each user's data is completely isolated by account
- User settings and conversations accessible only to authenticated account owner
- Your data is never used to train AI models

---

## What Data Does HyperPerfect Store?

| Data Type | Purpose | Retention |
|-----------|---------|-----------|
| **Email Address** | User authentication and account identity | Until account deletion |
| **Conversation History** | Maintain chat context, including any spreadsheet data you send to the AI | 30 days |
| **Workbook Metadata** | Sheet names and active range info for accurate tool execution | 30 days (stored with conversations) |
| **Usage Records** | Token counts and cost tracking for billing | Until account deletion |
| **Custom Instructions** | Your personalized AI preferences | Until account deletion |
| **Uploaded Files** | Images and PDFs you attach to conversations | 30 days |

**Important:** When you send spreadsheet data to the AI (by selecting cells and asking a question), that data is included in your conversation history and stored on our servers for up to 30 days. Data you do not send to the AI is never accessed or stored.

---

## How Your Data Flows

### The Request Lifecycle

1. **You authenticate with Microsoft SSO** - same secure login you use for Office 365
2. **You select data in Excel and send a message** - only your selected data and message are transmitted
3. **HyperPerfect server receives your request** - your message and any spreadsheet data are stored in conversation history
4. **Server forwards your conversation to Anthropic Claude** - the AI processes your request
5. **AI responds** - results stream back through our server and are applied to your workbook

### Data Destinations

| Destination | What is Sent | Retention |
|-------------|-------------|-----------|
| **HyperPerfect Server** | Messages, spreadsheet data you send, workbook metadata, file attachments | 30 days |
| **Anthropic Claude** | Conversation history, system instructions, file content | Deleted within 30 days per Anthropic policy |
| **Analytics (Mixpanel)** | Anonymized usage events (feature usage, error counts) — no spreadsheet data | Per Mixpanel retention policy |

---

## AI Provider: Anthropic Claude

HyperPerfect exclusively uses **Anthropic Claude** for AI processing, chosen specifically for its industry-leading data protection and privacy practices.

### Why Anthropic Claude?

**Zero Data Retention for API Users:**
- Your data is **never used to train AI models**
- Customer content deleted within **30 days** of processing
- No data retention beyond required security monitoring
- Contractual guarantee: "may not train models on Customer Content"

**Enterprise-Grade Security:**
- **SOC 2 Type II certified** with annual third-party audits
- **AES-256 encryption** for data at rest on Anthropic's infrastructure
- **TLS 1.2+ encryption** for all data in transit
- **48-hour breach notification** commitment
- Annual penetration testing and vulnerability assessments

**Regulatory Compliance:**
- **GDPR compliant** - European data protection standards
- **CCPA compliant** - California privacy rights
- **HIPAA-eligible** with Business Associate Agreement (BAA)
- Comprehensive Data Processing Addendum (DPA) available

---

## Authentication & Access Control

### Single Sign-On (SSO)

**Business Users:**
- Sign in with your work Microsoft account
- No separate passwords to manage
- Session expires after 24 hours of inactivity

**IT Administrators:**
- Integrated with Microsoft Identity Platform
- JWT tokens validated against Microsoft JWKS on every request
- Email-based authorization lists (optional)
- Admin consent workflow for organizational deployment

---

## For IT Administrators

**Microsoft 365 Integration:**
- Runs as native Office Add-in within Excel security sandbox
- Respects existing Conditional Access policies
- Admin consent available for organizational deployment
- Compatible with Azure AD authentication requirements

**Infrastructure:**
- Backend hosted on Azure App Service
- PostgreSQL database hosted on Azure
- File storage on Azure Blob Storage
- All communications over HTTPS/TLS 1.2+

**Network Security:**
- TLS 1.2+ encryption for all data in transit
- JWT token validation on every API request
- Outbound connections only to Anthropic Claude API and Mixpanel analytics

**Application Security:**
- Parameterized database queries via sqlc (SQL injection prevention)
- Input validation and sanitization on all tool parameters
- Regular security dependency updates

---

## Compliance & Standards

### Data Privacy

- User data processed only with explicit user actions
- Right to access your data (contact support)
- Right to deletion (complete account and data removal available)
- No data sharing with third parties beyond Anthropic (AI provider) and Mixpanel (anonymized analytics)

---

## Common Security Questions

### Can HyperPerfect access my spreadsheet data?
**Only what you explicitly send to the AI.** When you select cells and ask the AI a question, only that selected data is processed. HyperPerfect never scans or accesses your entire workbook.

### Is my spreadsheet data stored?
**Yes, as part of your conversation history.** Any data you send to the AI is stored in your conversation history for up to 30 days. Data you do not send to the AI is never accessed or stored by HyperPerfect.

### Can other users see my data?
**No.** User data is completely isolated. Each user's settings and conversation history are accessible only to their authenticated account.

### Do you train AI models on my data?
**Absolutely not.** This is contractually guaranteed by both HyperPerfect and Anthropic Claude.

### Can HyperPerfect be used with sensitive financial data?
**Yes.** Anthropic Claude's data protection (SOC 2 Type II, zero-training guarantee, 30-day deletion) makes it suitable for sensitive financial work. Be mindful that any data you send to the AI will be transmitted to and temporarily stored by both HyperPerfect and Anthropic.

### How long is my data retained?
**Conversation data is retained for 30 days**, then automatically deleted. Account information (email, preferences) is retained until you request account deletion.

---

## Data Deletion & User Rights

### Conversation Management

- **Start fresh anytime** - use the `@clear` command to start a new conversation
- Previous conversations are retained for up to 30 days, then automatically deleted

### Complete Account Deletion

**Contact:** [help@hyperperfect.ai](mailto:help@hyperperfect.ai) for complete data removal including all conversation history, usage records, and account information.

---

## Security Contact

**For security vulnerabilities or concerns:**
- **Email:** [help@hyperperfect.ai](mailto:help@hyperperfect.ai)
- **Response Time:** Within 48 hours for critical issues

**For IT security reviews or compliance questions:**
- Architecture diagrams, security questionnaires, and compliance documentation available on request.
