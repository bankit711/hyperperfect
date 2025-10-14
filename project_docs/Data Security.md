# HyperPerfect Security & Data Protection

**Last Updated: January 2025**

---

## Executive Summary

HyperPerfect is designed for financial professionals who need AI-powered Excel assistance without compromising data security or compliance requirements.

### Key Security Principles

✅ **Your Excel Data Never Leaves Your Control**
- Spreadsheet data is never stored on our servers
- AI processes only what you explicitly send
- Powered by Anthropic, the industry leader in data protection
- Your data is never used for training

✅ **Enterprise-Grade Authentication**
- Microsoft Single Sign-On (SSO) integration
- OAuth 2.0 authentication
- Compatible with existing Microsoft 365 security policies

✅ **Encrypted Storage for Settings**
- API keys encrypted with AES-256-CBC
- Database hosted on Azure with enterprise security
- User settings isolated and protected

✅ **You Control Your Data**
- Delete your data anytime
- Transparent about what data flows where
- Your data is never used to train AI models

---

## What Data Does HyperPerfect Store?

### ✅ What We Store

| Data Type | Purpose | Storage Location | Retention |
|-----------|---------|------------------|-----------|
| **Email Address** | User authentication and authorization | Azure-hosted secure database | Until account deletion |
| **Chat History** | Maintain conversation context | Azure-hosted secure database | Clear it anytime |


## How Your Data is Protected

### For Business Users

**When You Use HyperPerfect:**

1. **You authenticate with Microsoft SSO** - same secure login you use for Office 365
2. **You select data in Excel** - HyperPerfect only sees what it needs to for your requests
3. **You choose to send it to AI** - data goes directly to AI provider
4. **AI responds and modifies your workbook** - results stay in your Excel file

**Your Spreadsheet Data Flow:**
```
Your Excel File → (You select data) → Anthropic Claude → Results back to Excel
                                            ↓
                                   Never used for training
                          HyperPerfect only stores active chat context
```

**Your Settings Data Flow:**
```
Your API Keys → AES-256 Encryption → Azure Database (encrypted at rest)
Your Preferences → Azure Database (secure storage)
```

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

**Transparent Data Handling:**
- Customer content is your confidential information
- Cannot be used without explicit permission
- Independent security audits available at trust.anthropic.com
- Clear contractual protections in commercial terms

### What This Means for Your Data

**When you use HyperPerfect:**
1. Selected Excel data is sent directly to Anthropic via HTTPS
2. Claude processes your request and responds
3. Your data is deleted from Anthropic's systems within 30 days
4. **Your data is never used to improve AI models**
5. Anthropic cannot share your data with third parties

**For Financial Professionals:**
- Safe for sensitive financial analysis (P&L, forecasts, customer data)
- Contractual protections exceed most AI providers
- Suitable for regulated industries with appropriate safeguards
- No competitive intelligence risk (data never used for training)

**For IT Administrators:**
- BAA available for HIPAA compliance needs
- DPA covers GDPR and international data protection requirements
- Full audit trail and breach notification procedures
- Subprocessor transparency and customer approval rights

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

### Anthropic API Key Security

**Your Anthropic API Keys:**
- Stored encrypted (AES-256-CBC with unique initialization vectors)
- Never shared between users
- Decrypted only when making requests to Anthropic
- You can delete or rotate keys anytime
- Required only for connecting to your Anthropic account

**Security Measures:**
- Keys never logged or exposed in error messages
- Encrypted in transit to Anthropic (HTTPS/TLS 1.2+)
- Database-level user isolation prevents cross-access
- Environment-based master encryption key (never in code)
- You control your own Anthropic API key and usage limits

---

## Compliance & Standards

### Security Standards

**Infrastructure:**
- Hosted on Microsoft Azure (SOC 2, ISO 27001 compliant)
- Azure App Service with enterprise security features
- Azure Files for persistent, backed-up storage
- TLS 1.2+ encryption for all communications

**Application Security:**
- Parameterized database queries (SQL injection prevention)
- Input validation and sanitization
- Content Security Policy (CSP) headers
- Regular security dependency updates

### Data Privacy

**GDPR/Privacy Compliance:**
- No collection of personal financial data
- User data processed only with explicit actions
- Right to access your data (contact support)
- Right to deletion (complete data removal available)
- No data sharing with third parties (except chosen AI providers)

**Anonymous Analytics:**
- Mixpanel for usage analytics (anonymous, no PII)
- Used only for product improvement
- No tracking of spreadsheet content or financial data

---

## Common Security Questions

### Can HyperPerfect access my spreadsheet data?

**Only what you explicitly send to the AI.** When you select cells and ask the AI a question, only that selected data is processed. HyperPerfect never scans or stores your entire workbook.

### Where is my data stored?

**Your spreadsheet data is never stored by HyperPerfect.** Only your settings (API keys, preferences, chat history) are stored in an encrypted Azure database.

### Can other users see my data?

**No.** User data is completely isolated. Each user's API keys, settings, and chat history are accessible only to their authenticated account.

### What happens if I delete my account?

All your data (API keys, preferences, chat history, usage tracking) is permanently deleted from our database. This is irreversible.

### Do you train AI models on my data?

**Absolutely not.** This is contractually guaranteed:
- **HyperPerfect** never uses your data for training
- **Anthropic Claude** has a contractual obligation: "may not train models on Customer Content"
- Your data is deleted within 30 days of processing
- This protection is written into Anthropic's Commercial Terms of Service

This is a key reason we chose Anthropic - their zero-training policy is industry-leading and legally binding.

### How do I know my API keys are secure?

Your API keys are encrypted with AES-256-CBC (military-grade encryption) before storage. Each key has a unique encryption vector. Keys are decrypted only in memory when making AI requests.

### Can HyperPerfect be used with sensitive financial data?

**Yes.** Anthropic Claude's data protection makes it suitable for sensitive financial work:
- **Zero training on your data** - contractually guaranteed
- **30-day deletion** after processing
- **SOC 2 Type II certified** - enterprise security standards
- **HIPAA-eligible** - available with Business Associate Agreement
- **GDPR & CCPA compliant** - meets regulatory requirements

Many financial professionals use HyperPerfect for:
- P&L analysis and forecasting
- Customer revenue analysis
- Financial modeling and scenario planning
- Board reporting and executive dashboards

**Best practices for highly sensitive data:**
- Review Anthropic's DPA and security documentation at trust.anthropic.com
- Consider data masking for customer names or extremely sensitive values
- Ensure your use complies with your organization's data governance policies

### Is HyperPerfect compatible with our security policies?

**Likely yes.** HyperPerfect:
- Integrates with Microsoft 365 SSO and Conditional Access
- Runs within Office's security sandbox
- Requires admin consent for organizational deployment
- Uses Azure infrastructure (compatible with most enterprise policies)
- Contact us at help@hyperperfect.ai for specific policy reviews

---

## For IT Administrators: Technical Details

### Deployment & Installation

**Installation Methods:**
- **Individual Users:** Microsoft AppSource (Office Add-in Store)
- **Organization-Wide:** Microsoft 365 Admin Center → Integrated Apps
- **Admin Consent Required:** Yes, for organizational deployment

**Required Permissions:**
- Read/write access to Excel workbooks (user-initiated only)
- User profile read (email address for authentication)
- No background data access or automated data collection

### Infrastructure Architecture

**Backend Services:**
- **Hosting:** Azure App Service (managed PaaS)
- **Database:** SQLite on Azure Files (persistent storage mounted at `/mnt/data/`)
- **Authentication:** Microsoft Identity Platform (OAuth 2.0/JWT)
- **External APIs:** Direct HTTPS connections to AI providers

**Security Configuration:**
- TLS 1.2+ enforced for all connections
- JWT token validation on every request
- Prepared SQL statements (injection prevention)
- DELETE journal mode for distributed filesystem
- Environment-based secrets (no secrets in code)

### Data Encryption

**At Rest:**
- API Keys: AES-256-CBC with unique IV per key
- Database: Azure Files encryption (Microsoft-managed keys)
- Backup: Standard Azure Files backup policies

**In Transit:**
- HTTPS/TLS 1.2+ for all API communications
- No plain-text credentials transmitted
- JWT tokens with 7-day expiration

### Database Schema

**Tables Stored:**
- `users` - Email, name (from SSO), account metadata
- `user_api_keys` - Encrypted API keys per provider
- `user_provider_settings` - Model preferences, endpoints
- `conversations` - Chat message history for context
- `usage_tracking` - Token counts and costs
- `user_preferences` - UI settings (theme, etc.)

**Security Features:**
- Foreign key constraints with CASCADE DELETE
- User-level row isolation via foreign keys
- BCrypt hashing for key verification (cost factor 10)
- No cross-user data access possible

### Monitoring & Logging

**Application Logs:**
- Structured JSON logging (Azure App Insights compatible)
- No logging of API keys or spreadsheet data
- Error logs sanitized to prevent information leakage
- Anonymized usage metrics for product improvement

**Security Monitoring:**
- Failed authentication attempt tracking
- Database initialization validation
- File permission verification on startup
- Fail-fast behavior on misconfiguration

### Network Architecture

```
User's Excel Client
    ↓ (HTTPS/TLS)
Azure App Service (Backend API)
    ↓ (Microsoft SSO validation)
Microsoft Identity Platform
    ↓ (encrypted database access)
Azure Files (SQLite database)

AI Provider Connection:
User's Excel Client → (HTTPS/TLS 1.2+) → Anthropic Claude API
                                           ↓
                                  Data deleted within 30 days
                                  Never used for AI training
                            (HyperPerfect facilitates, doesn't proxy)
```

### Disaster Recovery

**Database Backup:**
- Azure Files standard backup policies apply
- Point-in-time recovery available (Azure support)
- No custom backup infrastructure required

**High Availability:**
- Azure App Service auto-scaling
- Singleton database pattern with file-based locking
- Stale lock detection (10-second timeout)
- Graceful degradation on service issues

---

## Data Deletion & User Rights

### Self-Service Options

**Users Can Delete:**
- Individual API keys (per provider)
- Chat conversation history
- Preferences and settings
- Browser session tokens

### Complete Account Deletion

**Contact Support:** help@hyperperfect.ai

**What Gets Deleted:**
- All API keys (irretrievably encrypted data removed)
- Complete chat history
- Usage tracking records
- All preferences and settings
- User account record

**Deletion Timeline:**
- Immediate removal from active database
- Standard Azure backup retention policies apply (consult Azure documentation)
- Anonymized error logs may remain (no identifiable data)

---

## Security Contact

### Reporting Security Issues

**For security vulnerabilities or concerns:**
- **Email:** help@hyperperfect.ai
- **Response Time:** Within 48 hours for critical issues

### Support for Enterprise Customers

**For IT security reviews or compliance questions:**
- **Email:** help@hyperperfect.ai
- **Available:** Architecture diagrams, security questionnaires, compliance documentation

---

## Updates to This Document

This security document is reviewed and updated regularly. Significant changes will be communicated to active users via email.

**Last Updated:** January 2025
**Version:** 2.0
