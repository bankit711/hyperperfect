---
name: brevo
description: Manage Brevo contacts and lists — add contacts, update attributes, list members, and manage list membership via the Brevo REST API.
---

# Brevo Contact Management

Manage contacts and lists in HyperPerfect's Brevo account via the REST API.

## Credentials

Load from `/Users/davidingraham/hyperperfect/.env.local`:
- `BREVO_API_KEY` — marketing API key
- `BREVO_SENDER_NAME` / `BREVO_SENDER_EMAIL` — verified sender (not needed for contacts, but available)

**If `BREVO_API_KEY` is missing or unauthorized:**
Stop and tell David: "Brevo API key is missing or expired. Check `.env.local` for `BREVO_API_KEY`."

All API calls use:
```
-H "api-key: $BREVO_API_KEY" -H "Content-Type: application/json"
```

Base URL: `https://api.brevo.com/v3`

---

## Available Lists

| ID | Name | Subscribers |
|----|------|-------------|
| 3 | Signups | 58 |
| 7 | Current App Subscribers | 59 |
| 9 | Contacts involved in conversations | 19 |
| 10 | Logged Into App | 33 |
| 15 | PE Contacts | 234 |
| 16 | AI Demos | 9 |
| 17 | Internal | 5 |
| 18 | Interested | 2 |
| 19 | Manual Adds | 1 |

Subscriber counts are approximate — refresh with `GET /contacts/lists` if needed.

---

## Contact Attributes

Standard fields: `EMAIL` (identifier), `FIRSTNAME`, `LASTNAME`, `SMS`, `JOB_TITLE`, `LINKEDIN`, `EXT_ID`

---

## Operations

### 1. Add a Contact

```bash
source /Users/davidingraham/hyperperfect/.env.local
curl -s -X POST "https://api.brevo.com/v3/contacts" \
  -H "api-key: $BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "EMAIL",
    "attributes": { "FIRSTNAME": "...", "LASTNAME": "...", "JOB_TITLE": "..." },
    "listIds": [LIST_ID],
    "updateEnabled": true
  }'
```

- `updateEnabled: true` — updates the contact if they already exist (won't duplicate)
- `listIds` — add to one or more lists on creation
- Attributes are optional — include whichever are known

### 2. Add Existing Contacts to a List

```bash
curl -s -X POST "https://api.brevo.com/v3/contacts/lists/{listId}/contacts/add" \
  -H "api-key: $BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "emails": ["email1@example.com", "email2@example.com"] }'
```

- Accepts up to 150 emails per call
- Contacts must already exist — use Operation 1 first if needed

### 3. Remove Contacts from a List

```bash
curl -s -X POST "https://api.brevo.com/v3/contacts/lists/{listId}/contacts/remove" \
  -H "api-key: $BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "emails": ["email@example.com"] }'
```

### 4. Look Up a Contact

```bash
curl -s "https://api.brevo.com/v3/contacts/EMAIL_URL_ENCODED" \
  -H "api-key: $BREVO_API_KEY" | python3 -m json.tool
```

- URL-encode the email (e.g., `user%40example.com`)
- Returns attributes, list memberships, and email activity stats

### 5. Update a Contact

```bash
curl -s -X PUT "https://api.brevo.com/v3/contacts/EMAIL_URL_ENCODED" \
  -H "api-key: $BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "attributes": { "FIRSTNAME": "...", "JOB_TITLE": "..." } }'
```

### 6. List Contacts in a List

```bash
curl -s "https://api.brevo.com/v3/contacts/lists/{listId}/contacts?limit=50&offset=0" \
  -H "api-key: $BREVO_API_KEY" | python3 -m json.tool
```

- Max 500 per page; use `offset` to paginate

### 7. Bulk Add Contacts

For adding many contacts at once, loop Operation 1 or use:

```bash
curl -s -X POST "https://api.brevo.com/v3/contacts/import" \
  -H "api-key: $BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "listIds": [LIST_ID],
    "jsonBody": [
      { "email": "a@example.com", "attributes": { "FIRSTNAME": "A" } },
      { "email": "b@example.com", "attributes": { "FIRSTNAME": "B" } }
    ],
    "updateExistingContacts": true
  }'
```

### 8. Refresh Lists

```bash
curl -s "https://api.brevo.com/v3/contacts/lists?limit=50&offset=0" \
  -H "api-key: $BREVO_API_KEY" | python3 -m json.tool
```

---

## Interaction Flow

1. **Parse the request** — identify contacts (email + any attributes) and target list(s)
2. **Confirm before executing** — show David what will be done:
   ```
   Adding 3 contacts to list "PE Contacts" (15):
     - jane@example.com (Jane Doe, Partner)
     - bob@example.com (Bob Smith)
     - alice@example.com (Alice Lee, CFO)
   Proceed?
   ```
3. **Execute** — run the API calls, report results (success/failure per contact)
4. **Report** — summarize what was done: contacts added, lists updated, any errors

**Never delete contacts without explicit confirmation.**
**Never remove contacts from lists without explicit confirmation.**

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Bad or expired API key | Check `.env.local` |
| `contact_already_exist` | Contact exists (not an error with `updateEnabled: true`) | Expected behavior |
| `document_not_found` | Email not in Brevo | Create the contact first |
| 400 on listIds | Invalid list ID | Refresh list IDs with Operation 8 |
