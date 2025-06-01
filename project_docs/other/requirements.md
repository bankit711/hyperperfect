1120 Office Add-ins: Word, Excel, PowerPoint, and Outlook
The policies listed in this section apply only to Office Add-in offers.

1120.1 Offer requirements
All Office Add-ins must use the latest version of the Microsoft-hosted Office.js file at https://appsforoffice.microsoft.com/lib/1/hosted/office.js.

All Office Add-ins must use the latest manifest schema.

Specify a valid Support URL in the SupportURL element of your add-in manifest.

A high-resolution icon is mandatory.

Source location must point to a valid web address.

The version number in the app package updates must be incremented.

1120.2 Mobile requirements
Office Add-ins also available on iOS or Android:

Must not include any in-app purchases, trial offers, UI that aims to up-sell to paid versions, or links to any online stores where users can purchase or acquire other content, apps, or add-ins.
The iOS or Android version of the add-in must not show any UI or language or link to any other apps, add-ins, or website that ask the user to pay. If the add-in requires an account, accounts may only be created if there is no charge; the use of the term "free" or "free account" is not allowed. You may determine whether the account is active indefinitely or for a limited time, but if the account expires, no UI, text, or links indicating the need to pay may be shown.
The associated Privacy Policy and Terms of Use pages must also be free of any commerce UI or Store links.
Must comply with the Outlook add-in design guidelines.
For Office Add-ins also available on iOS:

You must accept Apple's Terms and Conditions by selecting the appropriate checkbox on the Partner Center app submission form.
Your add-in must be compliant with all relevant Apple App Store policies.
You must provide a valid Apple ID.
Outlook add-ins with mobile support receive additional design review during validation, which adds to the required validation time. Outlook add-in design guidelines (link above) describes how your offer will be evaluated during the design review.

1120.3 Functionality
Add-ins must follow design guidelines without impeding the customer experience within the host application.

Your app or add-in must be fully functional with the supported operating systems, browsers, and devices for Office 2016, SharePoint 2013, and Office 365.

Your add-in will be tested and evaluated on Windows 10 (build 1903+ on Edge Legacy and earlier builds prior to 1903 with Internet Explorer 11).
All features must work on a touch-only device without a physical keyboard or mouse.
Your app or add-in must not utilize deprecated functionality.
Your add-in may not alter or promote the alteration of Office or SharePoint except via the Office and SharePoint add-ins model.
Add-ins must be compatible with the latest versions of Microsoft Edge, Google Chrome, Mozilla Firefox, and Apple Safari (macOS). Internet Explorer (IE) in Windows is still used in many Office configurations as noted in Browsers used by Office Add-ins. We recommend supporting IE, but if your add-in does not, you should advise users to install the latest Office version. For details, see Determine at runtime if the add-in is running in Internet Explorer.

Add-ins must work in all Office applications specified in the Hosts element in the add-in manifest.

Add-ins must work across all platforms that support methods defined in the Requirements element in the add-in manifest, with the following platform-specific requirements.

Add-ins must support Office on web and Mac applications compatible with the APIs listed in the Requirements element.
Add-ins that support iOS must be fully functional on the latest iPad device using the latest version of iOS.
Add-ins that use the task pane manifest must support add-in commands.
Content add-ins for PowerPoint may not activate their content (such as play audio or video) until after the JavaScript API for Office Office.initialize event has been called. This ensures that content display will correctly synchronize with presentations.
To help ensure an efficient validation process, if your add-in supports Single Sign-On, you must provide certification test notes explaining how your add-in uses SSO and what functionality in the add-in uses it. This information is required to ensure the validation team can test the fallback implementation. Offers that support Single Sign-On (SSO) must follow the SSO guidelines and include a fallback authentication method.

1120.4 Outlook add-ins functionality
The policies listed in this section apply only to Outlook add-in offers.

All Outlook add-ins must support Outlook on the web (Modern).
Outlook on the web (Classic) is preferred but optional for requirement sets of 1.5 or lower.
Outlook add-ins must not include the CustomPane extension point in the VersionOverrides node.
Outlook add-ins that support mobile must allow users to log on separately for each email account added to the Outlook app.
Add-in commands must be supported if your add-in is shown on every message or appointment, whether in read or compose mode.
If your add-in manifest includes the SupportPinning element for read mode of a message and/or appointment, the pinned content of the add-in must not be static and must clearly display data related to the message and/or appointment that is open or selected in the mailbox.
Outlook add-ins must not include the ItemSend event in the Events extension point.
If your add-in can use the AppendOnSend feature, you must include a disclosure in your offer description noting in what conditions the option is used and what information is being inserted (for example, "If configured to do so, this add-in appends legal disclaimers to email sent by the user").
If your add-in uses the Event-based Activation feature, you must include a disclosure in your offer description noting what information is being inserted in what events or conditions (for example, "Defined Signature will be inserted in Mail subject on composing new e-mail"). To help ensure an efficient validation process, when submitting your offer you must provide certification test notes explaining how to configure and test scenarios for auto launch events in your add-in.
Add-ins must not include the "Block" SendMode when using LaunchEvents "OnMessageSend" and/or "onAppointmentSend".
1120.5 Excel custom functions
The policies listed in this section apply only to Excel offers.

1120.5.1 Offer information and support contacts
Your custom functions metadata must have the helpUrl property set.

1120.5.2 Security
To help to ensure the security of your app and users, your custom functions HTML, JavaScript, and JSON metadata files must be hosted on the same domain.

1120.5.3 Functionality
Add-ins that contain custom functions must support add-in commands. This is to ensure that users can easily discover your add-in.

Your add-in must work across all platforms that support custom functions.

After an add-in is approved using the EquivalentAddins tag in the manifest, all future updates to the add-in must include this tag. This tag ensures that your custom functions save in XLL-compatible mode.

1120.5.4 Validation
To help ensure an efficient validation process, if your add-in contains custom functions, you must provide certification test notes for at least one custom function to validate them on submission.