# Azure Enterprise SSO Quick Reference

  

## Information to Provide to HyperPerfect

  

### 1. Find Your Tenant ID

**Location**: Azure Portal → Microsoft Entra ID → Overview

**What it looks like**: `72f988bf-86f1-41af-91ab-2d7cd011db47`

**Label**: "Tenant ID"

  

### 2. Find Your Azure OpenAI Endpoint

**Location**: Azure Portal → Your Azure OpenAI Resource → Keys and Endpoint

**What it looks like**: `https://your-resource-name.openai.azure.com`

**Label**: "Endpoint"

  

### 3. Find Your API Key

**Location**: Same page as endpoint (Keys and Endpoint)

**What it looks like**: Long string starting with letters/numbers

**Action**: Click "Show" next to KEY 1 or KEY 2, then copy

  

### 4. Find Your Deployment Name

**Location**: Azure Portal → Your Azure OpenAI Resource → Model deployments

**What it looks like**: `gpt-4`, `gpt-35-turbo`, or custom name you chose

**Label**: "Deployment name" column in the table

  

## Example Email to HyperPerfect

  

```

Subject: Azure Enterprise SSO Configuration

  

Please configure our organization for Enterprise SSO:

  

Tenant ID: 72f988bf-86f1-41af-91ab-2d7cd011db47

Organization: Contoso Corporation

  

Azure OpenAI Configuration:

- Endpoint: https://contoso-ai.openai.azure.com

- Deployment: gpt-4-production

- API Version: 2024-08-01-preview

  

Please provide secure method to share API key.

```

  

## Visual Guide

  

### Finding Tenant ID

1. Go to [portal.azure.com](https://portal.azure.com)

2. Search "Microsoft Entra ID" in top search bar

3. Click on Microsoft Entra ID

4. On Overview page, find "Tenant ID" box

  

### Finding Azure OpenAI Details

1. Go to [portal.azure.com](https://portal.azure.com)

2. Search "Azure OpenAI" in top search bar

3. Click on your Azure OpenAI resource

4. Click "Keys and Endpoint" in left menu

5. Copy the Endpoint URL

6. Click "Show" next to a key and copy it

7. Click "Model deployments" in left menu

8. Note your deployment name from the table

  

## Common Values

  

- **API Version**: Usually `2024-08-01-preview` (HyperPerfect will confirm)

- **Max Tokens**: Typically `4096` or `8192`

- **Temperature**: Default `0.7` (users can adjust in UI)

  

## Security Reminder

  

- **Never email API keys** - Wait for secure sharing method

- API keys grant full access to your Azure OpenAI resource

- Consider rotating keys regularly (every 6-12 months)

- You can regenerate keys in Azure Portal if compromised