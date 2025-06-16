# Azure Enterprise SSO Setup Guide

  

## Overview

This guide helps IT administrators configure Microsoft Entra ID (formerly Azure AD) Enterprise Single Sign-On (SSO) for the HyperPerfect Excel add-in. This setup allows users to access Azure OpenAI services through their corporate credentials without managing individual API keys.

  

## How HyperPerfect SSO Works

  

### Authentication Flow

1. **User Selection**: User selects "Azure OpenAI (Enterprise SSO)" in HyperPerfect settings

2. **Token Request**: Excel requests an access token from Microsoft Entra ID using `Office.auth.getAccessToken()`

3. **User Consent**: First-time users see Microsoft's consent prompt for the requested permissions

4. **Token Exchange**: HyperPerfect backend validates the token and retrieves enterprise configuration

5. **API Access**: Backend uses your organization's Azure OpenAI API key to process requests

6. **Response**: AI responses are returned to the user through the secure channel

  

### Key Security Points

- **No API Keys in Browser**: Users never see or handle Azure OpenAI API keys

- **Authorization Code Flow**: Uses modern OAuth 2.0 flow (not deprecated implicit flow)

- **Dual Authentication**:

- SSO tokens authenticate users to HyperPerfect

- Your Azure OpenAI API key (stored on backend) authenticates to Azure OpenAI

- **Token Caching**: Office handles token refresh automatically (~1 hour lifetime)

  

## Architecture Overview

```

User → Excel Add-in → Microsoft Entra ID (SSO) → HyperPerfect Backend → Azure OpenAI

↓ ↓ ↓

Corp Login Enterprise Config API Key (Managed)

```

  

## Prerequisites

- Active Azure subscription with administrator access

- Deployed Azure OpenAI resource

- HyperPerfect Excel add-in deployed to your organization

- Global Administrator or Application Administrator role in Microsoft Entra ID

  

## Step 1: Create Azure OpenAI Resource

  

### 1.1 Deploy Azure OpenAI

1. Log into [Azure Portal](https://portal.azure.com)

2. Select **Create a resource** → Search for **Azure OpenAI**

3. Configure:

- **Subscription**: Your Azure subscription

- **Resource group**: Create new or use existing

- **Region**: Choose based on availability

- **Name**: `your-company-openai`

- **Pricing tier**: Based on your needs

4. Click **Review + create** → **Create**

  

### 1.2 Deploy a Model

1. Navigate to your Azure OpenAI resource → **Model deployments**

2. Click **Create new deployment**

3. Configure:

- **Model**: Select (e.g., `gpt-4`, `gpt-35-turbo`)

- **Deployment name**: `gpt-4-prod`

- **Version**: Latest available

4. Note down:

- **Endpoint**: `https://your-company-openai.openai.azure.com/`

- **Deployment name**: `gpt-4-prod`

- **API key**: Found in **Keys and Endpoint**

  

## Step 2: Register HyperPerfect in Microsoft Entra ID

  

### Understanding App IDs in This Setup

  

There are two different Application IDs involved:

  

1. **Your Organization's App ID** (Created in this step)

- Example: `942afc0a-f6b9-49be-a4a0-0bebf3a28b8c`

- This is what YOU create for YOUR organization

- Used in the Application ID URI you configure

  

2. **HyperPerfect's App ID** (Pre-existing)

- ID: `a2b76100-81e6-41bd-a405-d29c2dc59f97`

- This is OUR app ID that you'll pre-authorize

- Already configured in HyperPerfect's manifest

  

### 2.1 Create App Registration

1. In Azure Portal, search for **Microsoft Entra ID**

2. Navigate to **App registrations** → **+ New registration**

3. Configure:

- **Name**: `HyperPerfect Enterprise SSO`

- **Supported account types**:

- For single tenant: "Accounts in this organizational directory only"

- For multi-tenant: "Accounts in any organizational directory"

4. Click **Register**

5. **IMPORTANT - Copy and save these values**:

- **Application (client) ID**: (e.g., `942afc0a-f6b9-49be-a4a0-0bebf3a28b8c`)

- **Directory (tenant) ID**: Usually a GUID like `72f988bf-86f1-41af-91ab-2d7cd011db47`

> **Note**: This Application ID is YOUR organization's app registration ID, not HyperPerfect's. You'll use this ID throughout the setup process.

  

### Finding Your Tenant Name

  

Your tenant name can be found in several places:

  

1. **From Azure Portal**:

- Go to **Microsoft Entra ID** → **Overview**

- Look for **Primary domain**: (e.g., `contoso.onmicrosoft.com`)

- Your tenant name is the part before `.onmicrosoft.com` (e.g., `contoso`)

  

2. **From your email domain**:

- If your email is `john@contoso.com`, your tenant name is often `contoso`

- Note: Some organizations use different tenant names than their email domain

  

3. **Alternative**: You can also use your primary domain directly:

- Instead of `api://contoso.onmicrosoft.com/{app-id}`

- You can use `api://contoso.com/{app-id}` (if verified domain)

  

### 2.2 Configure Authentication

1. In app registration, go to **Authentication**

2. Click **+ Add a platform** → **Single-page application**

3. Add Redirect URIs:

- Primary: `https://hyperperfect-prod.azurewebsites.net/taskpane.html`

- Fallback dialog: `https://hyperperfect-prod.azurewebsites.net/fallbackauthdialog.html`

  

![Azure Authentication Configuration](./images/azure-sso-authentication-config.png)

*Example: Single-page application configuration in Azure Portal*

  

4. **Grant Types Section**:

- Leave both checkboxes UNCHECKED:

- ❌ Access tokens (used for implicit flows)

- ❌ ID tokens (used for implicit and hybrid flows)

- Office Add-ins use the secure Authorization Code Flow with PKCE

  

5. **Front-channel logout URL**:

- Leave blank (only needed for single sign-out across multiple applications)

  

6. Click **Configure**

  

7. After configuration, verify **Advanced settings**:

- **Allow public client flows**: Should show **No** (HyperPerfect has a secure backend)

- If it shows "Yes", click to change it to **No**

  

### 2.3 Configure API Permissions

1. Go to **API permissions**

2. Click **+ Add a permission** → **Microsoft Graph** → **Delegated permissions**

3. Add these permissions:

- `openid` (Sign users in)

- `profile` (View users' basic profile)

- `User.Read` (Sign in and read user profile)

- `offline_access` (Maintain access to data)

4. Click **Add permissions**

  

![API Permissions Configuration](./images/azure-sso-api-permissions.png)

*Example: Required Microsoft Graph permissions*

  

5. Click **Grant admin consent for [Your Organization]** → **Yes**

6. Verify all permissions show ✅ Granted status

  

### 2.4 Expose an API

1. Go to **Expose an API**

2. Next to **Application ID URI**, click **Add**

3. Azure will suggest a default URI - you can modify it to match your organization's setup:

- **Components needed**:

- `{your-tenant-name}`: Found in Microsoft Entra ID → Overview → Primary domain (e.g., `contoso` from `contoso.onmicrosoft.com`)

- `{your-app-id}`: The Application ID you copied in Step 2.1

- **Format**: `api://{your-tenant-name}.onmicrosoft.com/{your-app-id}`

- **Example**: `api://contoso.onmicrosoft.com/942afc0a-f6b9-49be-a4a0-0bebf3a28b8c`

- **Alternative**: Use your verified domain like `api://contoso.com/{your-app-id}`

4. Click **Save**

  

![Expose API Configuration](./images/azure-sso-expose-api.png)

*Example: Setting Application ID URI and creating scope*

  

5. Click **+ Add a scope**:

- **Scope name**: `access_as_user`

- **Who can consent**: Admins and users

- **Admin consent display name**: Access HyperPerfect as the user

- **Admin consent description**: Allows Office to call HyperPerfect's web APIs with the same rights as the signed-in user

- **User consent display name**: Access HyperPerfect as you

- **User consent description**: Allows Office to call HyperPerfect's web APIs on your behalf

- **State**: Enabled

6. Click **Add scope**

  

### 2.5 Pre-authorize Applications

You need to pre-authorize both Office and HyperPerfect applications:

  

1. In **Expose an API**, click **+ Add a client application**

2. **First**, add HyperPerfect's application:

- **Client ID**: `a2b76100-81e6-41bd-a405-d29c2dc59f97` (HyperPerfect's app ID)

- Check ✅ the `access_as_user` scope

- Click **Add application**

  

![Pre-authorize Applications](./images/azure-sso-pre-authorize.png)

*Example: Pre-authorizing HyperPerfect and Office applications*

  

3. **Next**, add Office applications:

- **Client ID**: `ea5a67f6-b6f3-4338-b240-c655ddc3cc8e` (All Office apps)

- Check ✅ the `access_as_user` scope

- Click **Add application**

> **Note**: This single Office client ID covers all Office applications (Excel, Word, PowerPoint, Outlook, and Office on the web). You do NOT need to add individual Office app IDs.

  
  

### 2.6 Verify Token Configuration

**Note**: Modern app registrations should have these settings configured correctly by default when you select "Single-page application" platform. Only check the manifest if you experience authentication issues.

  

To verify (optional):

1. Go to **Manifest**

2. Confirm `"accessTokenAcceptedVersion": 2` (should be set automatically)

3. Confirm `"oauth2AllowImplicitFlow": false` (Office Add-ins use Authorization Code Flow)

4. If changes were needed, click **Save**

  

## Step 3: Admin Self-Service Onboarding

  

### Quick Start Checklist for Admins

Before contacting HyperPerfect support, complete these steps:

  

#### ✅ Prerequisites Verification

- [ ] Azure subscription with Azure OpenAI access approved

- [ ] Global Administrator or Application Administrator role in Microsoft Entra ID

- [ ] Azure OpenAI resource created and model deployed

- [ ] HyperPerfect add-in deployed to your organization

  

#### ✅ Information to Gather

  

##### 1. Microsoft Entra Tenant ID

- **Where**: Azure Portal → Microsoft Entra ID → Overview

- **Look for**: "Tenant ID" (GUID format)

- **Example**: `72f988bf-86f1-41af-91ab-2d7cd011db47`

  

![Finding Tenant ID](./images/azure-find-tenant-id.png)

*Location of Tenant ID in Azure Portal*

  

##### 2. Azure OpenAI Configuration

Navigate to your Azure OpenAI resource in Azure Portal:

  

**A. Endpoint and API Key**:

- **Where**: Your Azure OpenAI resource → Keys and Endpoint (left menu)

- **You'll see**:

```

KEY 1

[Show] ••••••••••••••••••••••••••••••••

KEY 2

[Show] ••••••••••••••••••••••••••••••••

Endpoint

https://your-resource.openai.azure.com

```

- **Copy**: The endpoint URL and one of the API keys

  

![Azure OpenAI Keys and Endpoint](./images/azure-openai-keys-endpoint.png)

*Keys and Endpoint page in Azure OpenAI resource*

  

**B. Deployment Name**:

- **Where**: Your Azure OpenAI resource → Model deployments (left menu)

- **You'll see**: List of your deployed models

- **Look for**: The "Deployment name" column

- **Example**: `gpt-4-prod`, `gpt-35-turbo-prod`

  

![Azure OpenAI Deployments](./images/azure-openai-deployments.png)

*Model deployments showing deployment names*

  

#### ✅ App Registration Setup

Follow Section 2 above to create the app registration. Key points:

- Use **Single-page application** platform

- Do NOT enable implicit grant flows

- Set **Allow public client flows** to **No**

- Grant admin consent for all permissions

- Pre-authorize exactly 2 client IDs:

- HyperPerfect app ID: `a2b76100-81e6-41bd-a405-d29c2dc59f97`

- Office universal client ID: `ea5a67f6-b6f3-4338-b240-c655ddc3cc8e` (covers all Office apps)

  

#### ✅ Validation Steps

Before contacting support, verify:

1. **Test Azure OpenAI API** directly:

```bash

curl https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2024-08-01-preview \

-H "Content-Type: application/json" \

-H "api-key: YOUR_KEY" \

-d '{"messages":[{"role":"user","content":"test"}]}'

```

2. **Check App Registration**:

- API permissions show ✅ Granted status

- Application ID URI is set correctly

- Office applications are pre-authorized

  

### Option A: HyperPerfect Cloud Service (Recommended)

Once setup is complete, contact HyperPerfect support with:

  

**Email Template**:

```

Subject: Azure Enterprise SSO Configuration Request

  

Organization: [Your Company Name]

Microsoft Entra Tenant ID: [your-tenant-id]

App Registration ID: [your-app-id]

  

Azure OpenAI Configuration:

- Endpoint: https://your-company-openai.openai.azure.com/

- Deployment: gpt-4-prod

- API Version: 2024-08-01-preview

  

Validation Completed:

✅ Azure OpenAI API tested successfully

✅ App registration configured with admin consent

✅ Office applications pre-authorized

  

Please configure our tenant for Enterprise SSO access.

```

  

**Why We Need Your Azure OpenAI API Key**:

- **SSO authenticates users** to HyperPerfect (proves who they are)

- **API key authenticates** to Azure OpenAI service (allows API calls)

- Azure OpenAI requires its own API key - SSO tokens alone don't work

- Your API key stays on HyperPerfect's backend servers, never exposed to users

  

**Secure API Key Sharing**:

- HyperPerfect will provide a secure method to share your Azure OpenAI API key

- Never send API keys via email

- Options include: Encrypted file transfer, secure portal, or temporary access grant

  
  

## Step 4: Verify HyperPerfect Configuration

  

The HyperPerfect add-in manifest is already configured for SSO. No changes are needed on your end.

  

**Our Configuration**:

- Application ID: `a2b76100-81e6-41bd-a405-d29c2dc59f97`

- Resource URI: `api://hyperperfect-prod.azurewebsites.net/a2b76100-81e6-41bd-a405-d29c2dc59f97`

- Required Scopes: openid, profile, User.Read, offline_access, access_as_user

  

**Important**: When creating your app registration in Step 2, you're authorizing HyperPerfect's application to use SSO with your tenant. The manifest configuration is managed by HyperPerfect.

  

## Step 5: End User Experience

  

### 5.1 Initial Setup

1. Users open Excel with HyperPerfect add-in

2. Navigate to Settings tab

3. Select **Azure OpenAI (Enterprise SSO)** from dropdown

4. See: "Endpoint and model configuration is managed by your organization"

  

![HyperPerfect Enterprise SSO Selection](./images/hyperperfect-enterprise-sso-setting.png)

*Example: Selecting Azure OpenAI (Enterprise SSO) in HyperPerfect settings*

  

### 5.2 First Authentication

1. When using AI features first time:

- Microsoft consent prompt appears

- Shows requested permissions

- User clicks **Accept**

2. Token cached for future use

3. No API keys or configuration needed

  

### 5.3 Ongoing Usage

- Automatic authentication using cached tokens

- Token refresh handled automatically

- No user intervention required

  

## Step 6: Verification and Testing

  

### 6.1 Admin Verification

1. Install add-in in Excel

2. Open browser developer tools (F12)

3. Go to Console tab

4. Select "Azure OpenAI (Enterprise SSO)"

5. Check for:

- `[Info] [AZURE_ENTERPRISE_PROVIDER] Starting Azure Enterprise provider initialization`

- `[Info] [AZURE_ENTERPRISE_PROVIDER] Enterprise config loaded`

- No authentication errors

  

### 6.2 Test Authentication Flow

1. Send test message in AI chat

2. Verify consent prompt appears (first time)

3. Complete authentication

4. Confirm message sends successfully

  

### 6.3 Common Validation Points

- ✅ Application ID URI matches in both Entra ID and manifest

- ✅ Admin consent granted for all permissions

- ✅ Token version set to 2 in manifest

- ✅ Office applications pre-authorized

- ✅ Azure OpenAI endpoint accessible

  

## Troubleshooting

  

### "Office.auth.getAccessToken is not available"

- Ensure running in Excel, not browser

- Verify manifest has WebApplicationInfo section

- Check Office version supports SSO (Office 2016+ required)

  

### "Authentication failed"

- Verify CLIENT_ID and CLIENT_SECRET in backend

- Check token version is 2 in app manifest

- Ensure redirect URIs match exactly

- Verify admin consent was granted

  

### "No enterprise AI configuration found"

- Check tenant ID in backend configuration

- Verify AZURE_ENTERPRISE_* environment variables

- Ensure backend service restarted after config changes

  

### "Invalid Azure OpenAI credentials"

- Test API key directly with curl:

```bash

curl https://your-resource.openai.azure.com/openai/deployments/gpt-4-prod/chat/completions?api-version=2024-08-01-preview \

-H "Content-Type: application/json" \

-H "api-key: YOUR_KEY" \

-d '{"messages":[{"role":"user","content":"Hello"}]}'

```

- Verify deployment name matches exactly

- Check endpoint URL format

  

## Frequently Asked Questions (FAQ)

  

### Q: Why don't we need to enable implicit grant flows?

**A**: Office Add-ins using `Office.auth.getAccessToken()` utilize the secure Authorization Code Flow with PKCE. The Office host application handles the OAuth flow on behalf of the add-in. Implicit flow is deprecated and less secure.

  

### Q: What is the "Allow public client flows" setting?

**A**: This setting determines if your app can use flows designed for applications that cannot securely store secrets (like mobile apps). For HyperPerfect with a secure backend, this should be **No** as we're a confidential client.

  

### Q: Do we need a front-channel logout URL?

**A**: No, unless you're implementing single sign-out across multiple applications. For standard Office Add-in usage, leave this blank.

  

### Q: Why do we pre-authorize both HyperPerfect and Office applications?

**A**: Pre-authorization serves two purposes:

- **HyperPerfect app** (`a2b76100-81e6-41bd-a405-d29c2dc59f97`): Allows HyperPerfect to access your Azure AD tenant

- **Office apps** (`ea5a67f6-b6f3-4338-b240-c655ddc3cc8e`): Allows Office to call HyperPerfect on behalf of users

Both are required for the complete SSO flow to work seamlessly.

  

### Q: Can users outside our organization use this?

**A**: No, Enterprise SSO is limited to users within your Microsoft Entra tenant. External users would need to use their own organization's SSO or individual API keys.

  

### Q: What permissions does HyperPerfect actually use?

**A**:

- `openid`, `profile`: Basic user identity

- `User.Read`: Read user's name and email from Microsoft Graph

- `offline_access`: Enable token refresh without re-prompting

- We do NOT access user's emails/messages, files, or other Microsoft 365 data

  

### Q: How long are tokens valid?

**A**: Access tokens are typically valid for 1 hour. Office automatically handles token refresh using the refresh token, so users won't need to re-authenticate frequently.

  

### Q: Can we restrict which users have access?

**A**: Yes, you can use Microsoft Entra Conditional Access policies or restrict the app registration to specific users/groups in your tenant.

  

### Q: Why do we need to share our Azure OpenAI API key?

**A**: Azure OpenAI requires its own authentication separate from Microsoft Entra ID. While SSO proves who the user is to HyperPerfect, Azure OpenAI still needs an API key to authorize API calls. This is a limitation of Azure OpenAI - it doesn't accept Entra ID tokens directly. Your API key is securely stored on HyperPerfect's backend and never exposed to end users.

  

## Support Resources

  

### HyperPerfect Support

- Email: contact@hyperperfect.com

  

### Microsoft Documentation

- [Office Add-in SSO](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/sso-in-office-add-ins)

- [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/)

- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)