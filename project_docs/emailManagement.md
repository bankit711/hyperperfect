# Real-Time Email Management System

## Overview

The Real-Time Email Management System provides instant user access control without requiring application restarts. This system replaces traditional static email allowlists with a dynamic, in-memory cache that can be updated via secure API endpoints or synced with Airtable.

## Architecture

### Core Components

1. **EmailManager Service** (`src/middle-tier/emailManager.js`)
   - Singleton service managing in-memory email cache
   - Provides O(1) lookup performance for email validation
   - Handles initialization from environment variables
   - Optional Airtable synchronization via polling

2. **API Endpoints** (`src/middle-tier/app.js`)
   - RESTful endpoints for email management operations
   - Secure admin authentication required for modifications
   - Real-time updates with immediate effect

3. **Authentication Integration**
   - Hooks into both MSAL and legacy JWT authentication flows
   - Performs instant email validation during login process

4. **Airtable Integration** (Optional)
   - Sync email list from Airtable without webhooks (free tier compatible)
   - Configurable polling interval for updates
   - Automatic pagination for large email lists

## How It Works

### 1. In-Memory Cache System

```javascript
class EmailManager {
  constructor() {
    this.allowedEmailsCache = new Set(); // Fast O(1) lookups
    this.initializeFromEnv(); // Initialize from environment variables
  }
}
```

**Benefits:**
- **Lightning fast** email checks (microseconds)
- **Immediate updates** without external dependencies
- **Memory efficient** storage of email strings

### 2. Authentication Flow Integration

The system integrates with two authentication paths:

**MSAL Flow** (`app.js`):
```javascript
const userPrincipalName = (graphResponse.data.userPrincipalName || "").toLowerCase();
if (!emailManager.isEmailAllowed(userPrincipalName)) {
  return res.status(403).json({ error: "User not authorized." });
}
```

**Legacy JWT Flow** (`ssoauth-helper.js`):
```javascript
const userEmail = (decoded.preferred_username || decoded.upn || decoded.email || "").toLowerCase();
if (!emailManager.isEmailAllowed(userEmail)) {
  return res.sendStatus(403);
}
```

### 3. Real-Time Updates

Updates take effect in 0-5 seconds without application restarts:

```
API Request → In-Memory Cache Update → Immediate Effect
```

## API Endpoints

### Authentication

All modification endpoints require admin authentication via the `X-Admin-Key` header:

```bash
-H "X-Admin-Key: your-admin-api-key"
```

### Available Endpoints

#### 1. View Current Email List
```http
GET /admin/emails
```

**Response:**
```json
{
  "allowedEmails": [
    "user1@company.com",
    "user2@company.com"
  ],
  "totalCount": 2,
  "isInitialized": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "lastSyncTime": "2024-01-01T11:59:30.000Z",
  "airtableEnabled": true
}
```

#### 2. Add Email to Allowlist
```http
POST /admin/emails/add
Content-Type: application/json
X-Admin-Key: your-admin-api-key

{
  "email": "newuser@company.com"
}
```

**Success Response:**
```json
{
  "message": "Email added successfully",
  "email": "newuser@company.com",
  "totalEmails": 3
}
```

#### 3. Remove Email from Allowlist
```http
POST /admin/emails/remove
Content-Type: application/json
X-Admin-Key: your-admin-api-key

{
  "email": "user@company.com"
}
```

**Success Response:**
```json
{
  "message": "Email removed successfully",
  "email": "user@company.com",
  "totalEmails": 2
}
```

#### 4. Bulk Update Email List
```http
POST /admin/emails/bulk
Content-Type: application/json
X-Admin-Key: your-admin-api-key

{
  "emails": [
    "user1@company.com",
    "user2@company.com",
    "user3@company.com"
  ]
}
```

**Success Response:**
```json
{
  "message": "Email list updated successfully",
  "totalEmails": 3,
  "emails": ["user1@company.com", "user2@company.com", "user3@company.com"]
}
```

## Configuration

### Environment Variables

#### Required for Production
```env
ADMIN_API_KEY=your-secure-random-key
```

#### Backward Compatibility
```env
ALLOWED_EMAILS=user1@domain.com,user2@domain.com,user3@domain.com
```

#### Airtable Integration (Optional)
```env
# Required for Airtable sync
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# Optional Airtable settings
AIRTABLE_TABLE_NAME=HyperPerfectRegistrations  # Default: HyperPerfectRegistrations
AIRTABLE_VIEW_ID=viwXXXXXXXXXXXXXX            # Optional: specific view
AIRTABLE_POLL_INTERVAL=30000                   # Default: 30 seconds (in milliseconds)
```

The system initializes from `ALLOWED_EMAILS` and then allows real-time updates via API or Airtable sync.

## Usage Examples

### Remove User Access Immediately
```bash
curl -X POST https://your-app.azurewebsites.net/admin/emails/remove \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-admin-key" \
  -d '{"email": "terminated-user@company.com"}'
```

### Add New User for Instant Access
```bash
curl -X POST https://your-app.azurewebsites.net/admin/emails/add \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-admin-key" \
  -d '{"email": "new-hire@company.com"}'
```

### Check Current Allowlist
```bash
curl https://hyperperfect-prod.azurewebsites.net/admin/emails
```

## Integration with Signup Flows

### Real-Time User Onboarding
```javascript
// After user completes signup process
async function grantUserAccess(userEmail) {
  const response = await fetch('/admin/emails/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': process.env.ADMIN_API_KEY
    },
    body: JSON.stringify({ email: userEmail })
  });
  
  if (response.ok) {
    console.log('User access granted immediately');
  }
}
```

### Automated User Provisioning
```javascript
// Integration with HR systems or user management platforms
async function syncUserAccess(hrSystemUsers) {
  await fetch('/admin/emails/bulk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': process.env.ADMIN_API_KEY
    },
    body: JSON.stringify({ emails: hrSystemUsers })
  });
}
```

## Performance Characteristics

### Speed Comparison

| Method | Update Time | Lookup Time | Downtime |
|--------|-------------|-------------|----------|
| Environment Variables | 5-15 minutes | Fast | High |
| Database | Medium | Slow | None |
| **Real-Time Cache** | **0-5 seconds** | **Microseconds** | **None** |

### Memory Usage
- Minimal memory footprint
- ~50 bytes per email address
- 1000 emails = ~50KB memory usage

## Security Features

### Admin Authentication
- Secure API key authentication
- Environment variable configuration
- No hardcoded credentials

### Access Control
- Read operations: Public (no sensitive data exposed)
- Write operations: Admin authentication required
- Audit trail via application logs

### Data Validation
- Email format validation
- Duplicate prevention
- Input sanitization

## Backward Compatibility

The system maintains full backward compatibility:

1. **Environment Variables**: Still supported as initialization source
2. **Existing Users**: No impact on current authentication flow
3. **Fallback Mechanism**: Falls back to environment variables if service fails
4. **Zero Breaking Changes**: Existing authentication logic unchanged

## Troubleshooting

### Common Issues

#### 1. "Admin API not configured"
**Cause**: `ADMIN_API_KEY` environment variable not set
**Solution**: Set the admin API key in your environment configuration

#### 2. "Invalid admin key"
**Cause**: Incorrect or missing admin key in request
**Solution**: Verify the `X-Admin-Key` header matches your environment variable

#### 3. Email not taking effect
**Cause**: Caching issue or incorrect email format
**Solution**: 
- Verify email format is correct
- Check current list with `GET /admin/emails`
- Ensure no trailing spaces or special characters

### Monitoring

Monitor the system using:
- Application logs for email management operations
- API response times for performance tracking
- Memory usage for cache size monitoring

## Best Practices

### Security
1. Use strong, random admin API keys
2. Rotate admin keys regularly
3. Monitor admin endpoint access logs
4. Use HTTPS for all API calls

### Performance
1. Keep email lists reasonably sized (< 10,000 emails)
2. Use bulk operations for large updates
3. Monitor memory usage in production

### Operations
1. Backup current email list before bulk changes
2. Test API operations in staging first
3. Document email management procedures for your team
4. Set up monitoring alerts for unauthorized access attempts

## Airtable Integration (Free Tier)

### Setting Up Airtable Sync

The system supports optional Airtable synchronization without requiring a paid subscription:

#### 1. Create Airtable Table
- Table Name: `HyperPerfectRegistrations` (or customize via env variable)
- Required Field: `EmailAddress` (Email field type)
- Optional Fields: Add any additional fields for your records

#### 2. Get Airtable Credentials
1. Go to [Airtable Account](https://airtable.com/account)
2. Generate a Personal Access Token with scopes:
   - `data.records:read` - To read email list
   - `schema.bases:read` - To access base structure
3. Find your Base ID in Help → API Documentation

#### 3. Configure Environment Variables
```env
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=HyperPerfectRegistrations  # Optional if using default
AIRTABLE_POLL_INTERVAL=30000                   # Optional (milliseconds)
```

### How Airtable Sync Works

1. **Polling Mechanism**: The system polls Airtable at regular intervals (default: 30 seconds)
2. **No Webhooks Required**: Works with Airtable's free tier
3. **Automatic Pagination**: Handles tables with more than 100 records
4. **Filtered Sync**: Only fetches records that have an email address
5. **Error Resilient**: Continues using cached emails if Airtable is unavailable

### Managing Emails in Airtable

- **Add User**: Create a new record with email address - syncs within poll interval
- **Remove User**: Delete record or clear email field - syncs within poll interval
- **Bulk Operations**: Use Airtable's CSV import/export features

### Important Notes

1. **API Changes are Temporary**: Direct API modifications will be overwritten by the next Airtable sync
2. **Sync Latency**: Maximum delay equals your poll interval (default 30 seconds)
3. **Performance**: Minimal overhead - only fetches email field, not entire records
4. **Rate Limits**: Polling once per 30 seconds is well within free tier limits

## Migration Guide

### From Static Environment Variables

1. **Before Migration**: Document current `ALLOWED_EMAILS` list
2. **Deploy**: Deploy the real-time system (initializes from existing env vars)
3. **Test**: Verify all existing users still have access
4. **Transition**: Start using API endpoints for new user management
5. **Optional**: Remove static emails from environment variables

### Adding Airtable Integration

1. **Create Airtable Base**: Set up your table with email records
2. **Import Existing Emails**: Use CSV import to add current users
3. **Configure Environment**: Add Airtable credentials to your environment
4. **Deploy Update**: The system will start syncing automatically
5. **Verify Sync**: Check `/admin/emails` endpoint for `airtableEnabled: true`

### Integration Checklist

- [ ] Set `ADMIN_API_KEY` environment variable
- [ ] Test API endpoints in staging
- [ ] Verify existing users maintain access
- [ ] Document new user onboarding process
- [ ] Train team on new email management procedures
- [ ] Set up monitoring and alerting
- [ ] (Optional) Configure Airtable integration
- [ ] (Optional) Import existing emails to Airtable
- [ ] (Optional) Test Airtable sync in staging