# Stripe SaaS Starter MVP

A minimal Stripe-powered SaaS starter with pricing plans and checkout functionality.

## Features

- 💳 **Stripe Checkout Integration** - Secure payment processing
- 🎨 **Modern UI** - Built with Next.js 14, React 18, and Tailwind CSS
- 📱 **Responsive Design** - Works on all devices
- 🚀 **TypeScript** - Type-safe code
- ⚡ **Fast** - Optimized with Turbopack

## What's Included in This MVP

This is a simplified version focusing on the core feature:
- Display pricing plans fetched from Stripe
- Stripe Checkout integration for subscriptions
- Clean, modern pricing UI
- Toast notifications

## What's NOT Included (to keep it simple)

- Authentication (no login/signup)
- Database (no Supabase)
- Customer portal
- Subscription management
- Webhooks (for MVP purposes)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Stripe account (free)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gitmvp-com/stripe-saas-starter-mvp.git
cd stripe-saas-starter-mvp
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Stripe keys to `.env.local`:
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your Publishable key and Secret key
   - Paste them into `.env.local`

### Create Test Products in Stripe

1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Create a few pricing plans (e.g., Starter, Pro, Enterprise)
4. Make sure to set up **recurring prices** (monthly or yearly)

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your pricing page.

## How It Works

1. **Pricing Page** (`app/page.tsx`) - Fetches products from Stripe and displays them
2. **API Route** (`app/api/create-checkout-session/route.ts`) - Creates Stripe Checkout sessions
3. **Pricing Component** (`components/ui/Pricing/Pricing.tsx`) - Displays pricing cards
4. **Stripe Utils** (`utils/stripe/`) - Helper functions for Stripe integration

## Testing Payments

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date and any CVC

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gitmvp-com/stripe-saas-starter-mvp)

1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your deployment URL)
4. Deploy!

## Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript 5.4.5
- **Styling**: Tailwind CSS 3.4.4
- **Payments**: Stripe 14.25.0
- **UI Components**: Radix UI
- **Icons**: Lucide React

## Next Steps

To turn this MVP into a production app, you might want to add:

1. **Authentication** - Add user login/signup (e.g., with NextAuth.js or Supabase)
2. **Database** - Store user data and subscriptions (e.g., Supabase, PostgreSQL)
3. **Webhooks** - Listen to Stripe events for real-time updates
4. **Customer Portal** - Let users manage their subscriptions
5. **Email Notifications** - Send receipts and updates

For a full-featured version, check out the [original Vercel template](https://github.com/vercel/nextjs-subscription-payments).

## License

MIT

## Credits

Based on [Vercel's Next.js Subscription Payments](https://github.com/vercel/nextjs-subscription-payments) template, simplified for MVP purposes.