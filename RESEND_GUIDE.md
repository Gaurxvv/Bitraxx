# Bitraxx Resend Email Integration Guide

This document outlines how to manage, test, and deploy the email notification system for Bitraxx using Resend.

## 1. Local Testing (Sandbox Mode)
By default, Resend limits sending to verified domains. If you are testing locally without a domain:

*   **Sender Address**: In `src/lib/actions.ts`, use `onboarding@resend.dev` as the `from` address.
*   **Recipient Limitation**: You can only send emails to the **email address used to sign up** for your Resend account.
*   **API Key**: Ensure `RESEND_API_KEY` is present in your `.env.local`.

## 2. Production Setup (Institutional Branding)
To send emails from `@brxcoin.com`, follow these steps:

### Step A: Domain Verification
1.  Log in to the [Resend Dashboard](https://resend.com/domains).
2.  Click **"Add Domain"** and enter `brxcoin.com`.
3.  Add the provided **MX, TXT, and CNAME** records to your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap).
4.  Wait for verification (usually 5-10 minutes).

### Step B: Update Sender Logic
Once verified, you can update `src/lib/actions.ts` to use your professional identity:
```typescript
await resend.emails.send({
  from: 'Bitraxx Sovereign <noreply@brxcoin.com>',
  to: formData.email,
  // ...
})
```

## 3. Email Template Customization
The email template is defined in `src/lib/actions.ts` using inline HTML. 

### Key Elements:
*   **Color Palette**: Uses `#EAB308` (Gold) for headers and IDs to match the "Sovereign Obsidian" brand.
*   **Dynamic Links**: Automatically generates a tracking link using `NEXT_PUBLIC_APP_URL`.
*   **Micro-copy**: Drafted to sound institutional and high-security ("Unique Booking ID", "Authorized Entries").

## 4. Troubleshooting
*   **Error: "Unauthorized Domain"**: You are trying to send from a domain (like `@brxcoin.com`) that hasn't been verified in your Resend account.
*   **Emails not arriving**: Check your Resend dashboard's "Logs" tab to see if the API request was successful. If logs show "Delivered" but you don't see it, check your spam folder or ensure the recipient email is your Resend login email (for unverified domains).
*   **API Key Issues**: Ensure the key starts with `re_` and has no trailing spaces in `.env.local`.
