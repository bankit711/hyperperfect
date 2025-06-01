Non-Compliant Areas
Office.js Version (1120.1)

Requirement: Must use the latest version at https://appsforoffice.microsoft.com/lib/1/hosted/office.js
Current Implementation: All HTML files use https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js
Issue: The URL path is incorrect (using 1.1 instead of 1)
Manifest Schema (1120.1)

Requirement: Must use the latest manifest schema
Current Implementation: Using xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
Issue: This may not be the latest schema version
Support URL Consistency (1120.1)

Requirement: Specify a valid Support URL
Issue: Inconsistent across manifest files:
manifest.xml and manifest.dev.xml: https://www.hyperperfect.ai/help
manifest.excel.xml: https://www.contoso.com/help
Source Location (1120.1)

Requirement: Source location must point to a valid web address
Current Implementation: Using localhost URLs (e.g., https://localhost:3000/clean.html)
Issue: While valid for development, these need to be updated for production deployment
Version Number (1120.1)

Requirement: Version number must be incremented for updates
Current Implementation: Version is set to "1.0.0" in all manifest files
Issue: No indication of version incrementation for updates
Placeholder Values in manifest.excel.xml 

Issue: Contains placeholder values:
{PORT} in URLs
{application GUID here} in WebApplicationInfo section
"Contoso" as provider name
Touch Device Support (1120.3)

Requirement: All features must work on touch-only devices without physical keyboard/mouse
Issue: No explicit testing or documentation found for touch device compatibility
Potentially Non-Compliant Areas (Insufficient Information)
Mobile Requirements (1120.2)

If the add-in is available on iOS/Android, additional requirements apply
No clear indication if mobile platforms are supported
Browser Compatibility (1120.3)

Must be compatible with latest versions of Edge, Chrome, Firefox, and Safari
No explicit testing documentation found
Single Sign-On Implementation (1120.3)

SSO-related code exists, but no documentation explaining how it uses SSO or fallback authentication
Excel Custom Functions (1120.5)

If custom functions are used, specific requirements apply
No clear indication if custom functions are implemented
Recommendations
Update Office.js reference to the correct URL: https://appsforoffice.microsoft.com/lib/1/hosted/office.js
Verify and update the manifest schema to the latest version
Standardize the Support URL across all manifest files
Replace localhost URLs with production URLs before publishing
Implement a version management strategy for incremental updates
Complete the placeholder values in manifest.excel.xml or remove this file if not needed
Document and test touch device compatibility
Create certification test notes for SSO functionality if used
Document browser compatibility testing
These changes will help ensure the add-in meets Microsoft's requirements for publishing to the Office Add-ins marketplace.