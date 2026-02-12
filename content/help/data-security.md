---
title: "Data Security"
description: "How HyperPerfect protects your data. Enterprise-grade security with Anthropic Claude's zero-training guarantee."
order: 7
category: "Enterprise"
---

HyperPerfect is designed for financial professionals who need AI-powered Excel assistance without compromising data security or compliance requirements.

## Key Security Principles

**Your Excel Data Never Leaves Your Control**
- Spreadsheet data is never stored on our servers
- AI processes only what you explicitly send
- Powered by Anthropic, the industry leader in data protection
- Your data is never used for training

**Enterprise-Grade Authentication**
- Microsoft Single Sign-On (SSO) integration
- OAuth 2.0 authentication
- Compatible with existing Microsoft 365 security policies

**Encrypted Storage for Settings**
- API keys encrypted with AES-256-CBC
- Database hosted on Azure with enterprise security
- User settings isolated and protected

**You Control Your Data**
- Delete your data anytime
- Transparent about what data flows where
- Your data is never used to train AI models

---

## What Data Does HyperPerfect Store?

| Data Type | Purpose | Storage Location | Retention |
|-----------|---------|------------------|-----------|
| **Email Address** | User authentication and authorization | Azure-hosted secure database | Until account deletion |
| **Chat History** | Maintain conversation context | Azure-hosted secure database | Clear it anytime |

---

## How Your Data is Protected

### For Business Users

**When You Use HyperPerfect:**

1. **You authenticate with Microsoft SSO** - same secure login you use for Office 365
2. **You select data in Excel** - HyperPerfect only sees what it needs for your requests
3. **You choose to send it to AI** - data goes directly to AI provider
4. **AI responds and modifies your workbook** - results stay in your Excel file

### For IT Administrators

**Microsoft 365 Integration:**
- Runs as native Office Add-in within Excel security sandbox
- Respects existing Conditional Access policies
- Admin consent available for organizational deployment
- Compatible with Azure AD authentication requirements

**Data Residency:**
- Backend hosted on Azure App Service
- Database storage on Azure Files (persistent, backed up)
- No data stored outside Microsoft Azure infrastructure
- Compatible with Microsoft compliance boundaries

**Network Security:**
- All communications over HTTPS/TLS 1.2+
- Direct connection to Anthropic Claude API
- No data proxy or man-in-the-middle storage
- JWT token validation on every API request
- Data deleted from Anthropic within 30 days

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
- **AES-256 encryption** for data at rest
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
- Automatic logout when Office session ends

**IT Administrators:**
- Integrated with Microsoft Identity Platform
- OAuth 2.0 authorization flows
- Email-based authorization lists (optional)
- Admin consent workflow for organizational deployment

### API Key Security

- Stored encrypted (AES-256-CBC with unique initialization vectors)
- Never shared between users
- Decrypted only when making requests to Anthropic
- You can delete or rotate keys anytime
- Keys never logged or exposed in error messages

---

## Compliance & Standards

### Security Standards

**Infrastructure:**
- Hosted on Microsoft Azure (SOC 2, ISO 27001 compliant)
- Azure App Service with enterprise security features
- TLS 1.2+ encryption for all communications

**Application Security:**
- Parameterized database queries (SQL injection prevention)
- Input validation and sanitization
- Content Security Policy (CSP) headers
- Regular security dependency updates

### Data Privacy

- No collection of personal financial data
- User data processed only with explicit actions
- Right to access your data (contact support)
- Right to deletion (complete data removal available)
- No data sharing with third parties (except chosen AI providers)

---

## Common Security Questions

### Can HyperPerfect access my spreadsheet data?
**Only what you explicitly send to the AI.** When you select cells and ask the AI a question, only that selected data is processed. HyperPerfect never scans or stores your entire workbook.

### Where is my data stored?
**Your spreadsheet data is never stored by HyperPerfect.** Only your settings (API keys, preferences, chat history) are stored in an encrypted Azure database.

### Can other users see my data?
**No.** User data is completely isolated. Each user's API keys, settings, and chat history are accessible only to their authenticated account.

### Do you train AI models on my data?
**Absolutely not.** This is contractually guaranteed by both HyperPerfect and Anthropic Claude.

### Can HyperPerfect be used with sensitive financial data?
**Yes.** Anthropic Claude's data protection makes it suitable for sensitive financial work including P&L analysis, customer revenue analysis, financial modeling, and board reporting.

---

## Data Deletion & User Rights

### Self-Service Options

**Users Can Delete:**
- Individual API keys (per provider)
- Chat conversation history
- Preferences and settings
- Browser session tokens

### Complete Account Deletion

**Contact:** [help@hyperperfect.ai](mailto:help@hyperperfect.ai) for complete data removal including all API keys, chat history, usage tracking, and account records.

---

## Security Contact

**For security vulnerabilities or concerns:**
- **Email:** [help@hyperperfect.ai](mailto:help@hyperperfect.ai)
- **Response Time:** Within 48 hours for critical issues

**For IT security reviews or compliance questions:**
- Architecture diagrams, security questionnaires, and compliance documentation available on request.
