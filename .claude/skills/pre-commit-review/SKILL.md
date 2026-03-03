---
name: pre-commit-review
description: Content quality review for staged changes before committing. Use when David says "review", "pre-commit", "check content", "ready to commit", or "review staged changes". Validates markdown frontmatter, writing rules, build, and email templates.
---

# Content Pre-Commit Review

Run this before committing content changes to the HyperPerfect marketing site.
This is a content quality check, not a code review. The site ships markdown and HTML, not application code.

**Human gate**: Present findings and let David decide what to fix. Never commit automatically.

---

## Setup

Capture staged changes once at the start. All phases operate on this snapshot.

```bash
git diff --cached --name-only
```

If nothing is staged, stop and tell David: "No staged changes found. Stage files with `git add` first."

Store the file list. Identify which categories are present:
- **Help articles**: any `.md` files in `content/help/`
- **Email templates**: any `.html` files in `assets/marketing_emails/`
- **Other content**: everything else staged

---

## Phase 1: Frontmatter Validation

**Skip if**: no `.md` files staged in `content/help/`.

For each staged help article, read the file and check:

1. **Frontmatter exists** — file starts with `---` and has a closing `---`
2. **Required fields present**: `title`, `description`, `order`, `category`
3. **Category is valid** — must be one of:
   - Getting Started
   - Using HyperPerfect
   - Enterprise
   - Resources
   - Legal

Report violations as:
```
FRONTMATTER: content/help/example.md
  - Missing field: description
  - Invalid category: "getting started" (must match exact case)
```

---

## Phase 2: Writing Rules Enforcement

**Skip if**: no content files staged (`.md` or `.html`).

Read the full writing rules from:
`/Users/davidingraham/.claude/projects/-Users-davidingraham-hyperperfect/memory/WRITING_RULES.md`

Check only the **added or changed lines** in staged content files:

```bash
git diff --cached -U0 -- '*.md' '*.html'
```

Look at lines starting with `+` (new content). Check for:

| Rule | Pattern |
|------|---------|
| Em dashes | `—` character anywhere |
| Spaced hyphens as punctuation | ` - ` used as sentence break (not list markers) |
| Banned words | seamlessly, effortlessly, powerful, robust, comprehensive, intuitive, streamlined, enhanced, straightforward, leveraging, utilizing |
| Banned phrases | "in order to", "this enables you to", "this allows you to", "it's worth noting", "please note", "keep in mind" |
| Corporate filler | additionally, furthermore, moreover, notably, importantly (as sentence filler) |
| Gerund-led bullets | Lines starting with `- Enabling`, `- Allowing`, `- Providing` |
| Passive voice (changelog only) | "was added", "has been updated", "is now supported" patterns in `changelog.md` |

Report each violation with file and line context:
```
WRITING: content/help/changelog.md:45
  - Banned word: "seamlessly"
  - Line: "This seamlessly integrates with your workflow"
```

---

## Phase 3: Build Validation

Always run this phase.

```bash
npm run build
```

If the build fails, report the error output. Common failures:
- Broken imports in page components
- Invalid markdown that breaks rendering
- Missing files referenced by pages

If the build succeeds, report: "Build passed."

---

## Phase 4: Email Template Check

**Skip if**: no `.html` files staged in `assets/marketing_emails/`.

For each staged email HTML file, read it and verify:

1. **Font**: References `Work Sans` font family
2. **Layout**: Has `max-width` of `560px` on the main container
3. **Greeting**: Contains `{{ contact.FIRSTNAME | default: "there" }}`
4. **Sign-off**: Contains "Dave" and "Founder, HyperPerfect"
5. **CTA button** (if present): Uses `#1a7bff` background color

Report missing elements:
```
EMAIL: assets/marketing_emails/customer_update_example.html
  - Missing: personalized greeting ({{ contact.FIRSTNAME }})
  - Missing: "Dave" sign-off
```

---

## Phase 5: Improvements Backlog Check

Read the improvements backlog at `.claude/improvements-backlog.md` (create it if it doesn't exist).

**Before reporting**, check if any backlog items are relevant to the current staged files. If so, include them in the report as a separate "Backlog" section:

```
BACKLOG: 2 known patterns relevant to this commit
  - changelog.md: passive voice in feature descriptions (seen 3 times)
  - email HTML: CTA button color drift (seen 2 times)
```

**After reporting**, check if any issues found in Phases 1-4 match an existing backlog pattern. If so, increment the count. If a new issue appears for the second time across runs, add it to the backlog:

```markdown
## Backlog entry format

### [Short description]
- **Pattern**: What to look for
- **Files**: Which files are typically affected
- **Count**: [N] occurrences across [N] reviews
- **First seen**: YYYY-MM-DD
- **Last seen**: YYYY-MM-DD
```

Only add to the backlog when a pattern repeats. One-off issues are not backlog items.

---

## Phase 6: Report

Present a single summary with all findings grouped by phase.

**If no issues found:**
```
Pre-commit review: all clear.
- Frontmatter: [N] files checked, no issues
- Writing rules: [N] files checked, no violations
- Build: passed
- Email templates: [N] files checked / skipped
- Backlog: [N] known patterns checked, none triggered

Ready to commit when you are.
```

**If issues found:**
```
Pre-commit review: [N] issues found.

[List all issues grouped by phase, as shown above]

[Backlog items, if any were triggered]

Fix these before committing, or tell me which ones to address.
```

Never commit. Wait for David's instructions.
