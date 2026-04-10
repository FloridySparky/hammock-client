# Hammock Property Inspections — Website Quick Reference

Everything you need to manage your website. Each section is self-contained — jump to what you need.

---

## 1. Edit Prices, Services, or Contact Info

All your website text lives in one file: `src/lib/site-data.json`.

1. Go to your repository on GitHub
2. Navigate to `src/lib/site-data.json`
3. Click the **pencil icon** (top right) to edit
4. Change what you need — prices, phone number, service descriptions, etc.
5. Click **Commit changes**
6. Vercel auto-deploys in about 60 seconds

**Important:** Don't change the words before the colons (like `"price"` or `"phone"`). Don't remove commas between items. Keep text inside quotation marks.

**If something breaks:** Go back to the file on GitHub, click **History**, then **Revert** on the previous version.

---

## 2. Change the Logo

1. Save your logo as `logo.png` (PNG, transparent background, at least 200px wide, horizontal orientation)
2. Go to GitHub → **`public`** folder → **Add file** → **Upload files** → upload `logo.png`
3. Commit the change
4. Go to `src/lib/site-data.json`, find `"logo"` near the top
5. Change `"type": "text"` to `"type": "image"`
6. Commit — your logo appears in about 60 seconds

To switch back to the text logo, change `"image"` back to `"text"`.

---

## 3. Replace the Hero Image

The large image on the homepage. Right now it shows a placeholder.

1. Prepare a landscape photo (at least 1200px wide, JPG, ~4:3 aspect ratio works best)
2. Name it `hero.jpg`
3. Go to GitHub → **`public`** folder → **Add file** → **Upload files** → upload `hero.jpg`
4. Commit the upload
5. Go to `src/lib/site-data.json`, find `"heroImage"` inside the `"hero"` section
6. Change `"type": "placeholder"` to `"type": "image"`
7. Commit — your photo appears in about 60 seconds

To go back to the placeholder, change `"image"` back to `"placeholder"`.

---

## 4. Set Up Google Analytics

1. Go to **analytics.google.com** and sign in with a Google account
2. Create an account and property for `hammockpropertyinspections.com`
3. Under **Data Streams** → **Web**, enter your website URL
4. Copy the **Measurement ID** (starts with `G-`)
5. Go to **Vercel dashboard** → your project → **Settings** → **Environment Variables**
6. Add: Name = `NEXT_PUBLIC_GA_MEASUREMENT_ID`, Value = your `G-` ID
7. Save, then go to **Deployments** → click **Redeploy**

Data starts showing up in 24-48 hours.

---

## 5. Set Up Microsoft Clarity (Heatmaps)

1. Go to **clarity.microsoft.com** and sign in (free)
2. Create a new project for `hammockpropertyinspections.com`
3. Copy the **Project ID** from Settings → Overview
4. Go to **Vercel dashboard** → your project → **Settings** → **Environment Variables**
5. Add: Name = `NEXT_PUBLIC_CLARITY_ID`, Value = your project ID
6. Save, then go to **Deployments** → click **Redeploy**

Shows heatmaps, scroll depth, and session recordings. Free, no limits.

---

## 6. Enable Vercel Analytics

1. Go to your **Vercel dashboard** → select your project → **Analytics** tab → click **Enable**

That's it. Shows page views, visitors, and performance scores.

---

## 7. Change the Favicon (Browser Tab Icon)

1. Start with a square image, at least 512x512 pixels
2. Go to **favicon.io**, upload it, and download the generated `favicon.ico`
3. In GitHub, navigate to **`src/app/`**
4. Upload the new `favicon.ico` (replacing the existing one)
5. Commit — Vercel rebuilds automatically

---

## 8. View Form Submissions

1. Go to **hammockpropertyinspections.com/admin**
2. Sign in with your admin email and password
3. Submissions are listed newest-first
4. Click a submission to see full details
5. Click the status badge (New → Read → Contacted) to track your follow-ups

Email delivery indicators show whether notification and confirmation emails were sent.

---

## 9. Reset Your /admin Password

1. Go to **supabase.com/dashboard** and sign in
2. Go to **Authentication** → **Users**
3. Find your admin user
4. Click the **three-dot menu** → **Send password recovery**
5. Check your email for the reset link

---

## 10. Email Setup

**Where notifications go:** The `CONTACT_EMAIL` environment variable controls who receives form submission emails. Currently set to `scott@hammockpropertyinspections.com`.

**To change the recipient:**
1. Go to **Vercel dashboard** → **Settings** → **Environment Variables**
2. Update `CONTACT_EMAIL` to the new email address
3. Redeploy

**To check if emails are delivering:**
1. Go to **resend.com** and sign in
2. The dashboard shows delivery status for every email sent

**Changing the email wording** requires a developer. The notification and confirmation templates are in `src/app/api/contact/route.ts` — specifically the variables `notificationLines` and `confirmationLines`.

---

## 11. Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (hosting) | Free | Hobby plan — plenty for this site |
| Supabase (database) | Free | Free tier, 500MB storage |
| Resend (email) | Free | 3,000 emails/month, 100/day |
| Google Analytics | Free | No limits |
| Microsoft Clarity | Free | No limits |
| Domain renewal | ~$15/year | Renew through your registrar |

**Total monthly cost: $0** (just the annual domain renewal)

---

## 12. Troubleshooting

**Site shows an error after I edited something**
→ Go to the file on GitHub → **History** → **Revert** the last change. Site rebuilds automatically.

**Form submissions aren't arriving by email**
→ Check your spam folder. Log into **resend.com** to see delivery status. Submissions are always saved in Supabase even if email fails — check `/admin`.

**I can't log into /admin**
→ Reset your password (see Section 9 above).

**Site looks different or broken**
→ Clear your browser cache (Ctrl+Shift+Delete). Try an incognito window. Check **Vercel dashboard** → **Deployments** for failed builds.

**Site is down**
→ Check **Vercel dashboard** → **Deployments**. Click **Redeploy** on the last successful one. If your domain expired, renew it through your registrar.

---

## 13. What You Can Do vs. What Needs a Developer

**You can handle:**
- Editing prices, services, contact info, headlines
- Swapping the logo or hero image
- Replacing the favicon
- Setting up analytics (Google, Clarity, Vercel)
- Viewing and managing form submissions
- Resetting your admin password

**Needs a developer:**
- Adding new pages or sections
- Changing the page layout or design
- Adding new form fields
- Integrating new services (booking, payments, etc.)
- Changing email notification wording
- Fixing a broken `site-data.json` edit

---

## 14. Support

For content changes (prices, text, logo, images), follow the steps above — you've got this.

For technical issues or new features, contact:

**Ethan — BasisWeb**
Phone: [placeholder]
Email: [placeholder]
