---
description: How to deploy Kalivox to Vercel
---

# Deploying Kalivox to Vercel

Follow these steps to take your portfolio live:

## 1. Push to GitHub
If you haven't already, create a new private or public repository on GitHub and push your code:
```bash
git init
git add .
git commit -m "Initial commit: Kalivox Portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/kalivox-portfolio.git
git push -u origin main
```

## 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** → **Project**.
3. Import your `kalivox-portfolio` repository.

## 3. Configure Environment Variables (CRITICAL)
Before clicking **Deploy**, you MUST add the following environment variables in the Vercel dashboard:

| Variable Name | Value |
| :--- | :--- |
| `GMAIL_USER` | `umarfarooq5743@gmail.com` |
| `GMAIL_APP_PASSWORD` | `lknforwsinesktvo` |
| `CONTACT_RECEIVER` | `umarfarooq5743@gmail.com` |

> [!IMPORTANT]
> Without these variables, your contact form will not send emails.

## 4. Deploy
Click **Deploy**. Vercel will build your Next.js app and give you a live URL (e.g., `kalivox.vercel.app`).

---

## Troubleshooting
- **Build Errors:** If the build fails, check the logs for missing dependencies or lint errors.
- **Email Not Sending:** Double-check that `GMAIL_APP_PASSWORD` is correct and has no spaces.
- **CSS Issues:** Vercel uses the build command `npm run build`. Ensure your Tailwind v4 setup is working locally before deploying.
