# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Setup

### Prerequisites

- Node.js (18.x or later)
- pnpm (or npm/yarn)
- MongoDB database (either MongoDB Atlas or local Docker instance)
- Google Cloud Platform account (for OAuth authentication)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd t3-x-payloadcms
pnpm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

### 3. Setup Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Configure OAuth consent screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields (App name, User support email, Developer contact)
5. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Set application name (e.g., "T3 Payload CMS App")
   - **Add authorized redirect URIs**:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
6. **Copy your credentials**:
   - **Client ID**: Copy this value for `GOOGLE_CLIENT_ID`
   - **Client Secret**: Copy this value for `GOOGLE_CLIENT_SECRET`
   - Save these credentials securely

### 4. Setup MongoDB

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from the "Connect" button

#### Option B: Local Docker Instance

```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

Your connection string will be: `mongodb://localhost:27017/your-database-name`

### 5. Configure Environment Variables

Update your `.env` file with the following variables:

```env
# Database
DATABASE_URI="mongodb://localhost:27017/your-database-name"
# or for Atlas: "mongodb+srv://username:password@cluster.mongodb.net/database-name"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (from Google Cloud Console - step 3.6)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payload CMS
PAYLOAD_SECRET="your-payload-secret"
```

Generate secrets using:
```bash
openssl rand -hex 32
```

### 6. Start Development Server

```bash
pnpm dev
```

Your app will be available at `http://localhost:3000`

- Frontend: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

## Shopify Integration (Optional)

To connect this project to Shopify for ecommerce functionality, follow these additional steps:

### 1. Install Shopify Dependencies

```bash
pnpm add @shopify/admin-api-client @shopify/storefront-api-client shopify-buy
pnpm add -D @types/shopify-buy
```

### 2. Create Shopify App

1. Go to your [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Create a new app:
   - Click "Create app" → "Create app manually"
   - Choose "Public app" for production or "Custom app" for development
   - Fill in your app details

### 3. Configure Shopify App Settings

1. **App setup**:
   - Set your app URL: `https://yourdomain.com` (or `https://ngrok-url.ngrok.io` for local development)
   - Set allowed redirection URLs: `https://yourdomain.com/api/auth/callback/shopify`

2. **API access**:
   - Go to "App setup" → "App permissions"
   - Enable required scopes:
     - `read_products` - Read product data
     - `read_orders` - Read order data
     - `read_customers` - Read customer data
     - `write_orders` - Create orders
     - `read_inventory` - Read inventory levels

3. **Storefront API**:
   - Enable Storefront API access
   - Generate a Storefront access token

### 4. Get Shopify Credentials

From your Shopify app dashboard, collect:
- **API Key** (Client ID)
- **API Secret Key** (Client Secret)
- **Storefront Access Token**
- **Shop Domain** (your-shop.myshopify.com)

### 5. Update Environment Variables

Add the following to your `.env` file:

```env
# Shopify Configuration
SHOPIFY_SHOP_DOMAIN="your-shop.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
SHOPIFY_API_KEY="your-shopify-api-key"
SHOPIFY_API_SECRET="your-shopify-api-secret"
SHOPIFY_WEBHOOK_SECRET="your-webhook-secret"
```

### 6. Update Environment Schema

Add Shopify variables to `src/env.mjs`:

```typescript
server: {
  // ... existing variables
  SHOPIFY_SHOP_DOMAIN: z.string(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_API_KEY: z.string(),
  SHOPIFY_API_SECRET: z.string(),
  SHOPIFY_WEBHOOK_SECRET: z.string(),
},

runtimeEnv: {
  // ... existing variables
  SHOPIFY_SHOP_DOMAIN: process.env.SHOPIFY_SHOP_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET,
},
```

### 7. Create Shopify Client

Create `src/lib/shopify.ts`:

```typescript
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { env } from '~/env.mjs';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: env.SHOPIFY_SHOP_DOMAIN,
  apiVersion: '2024-01',
  publicAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});
```

### 8. Setup Webhooks (Production)

1. In your Shopify app settings, go to "Webhooks"
2. Add webhook endpoints:
   - **Order created**: `https://yourdomain.com/api/webhooks/shopify/order-created`
   - **Order updated**: `https://yourdomain.com/api/webhooks/shopify/order-updated`
   - **Product updated**: `https://yourdomain.com/api/webhooks/shopify/product-updated`

### 9. Local Development with Shopify

For local development, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000
```

Use the ngrok URL in your Shopify app settings for development.

### Shopify Integration Features

With this setup, you can:
- Sync products from Shopify to Payload CMS
- Create orders through Shopify's Storefront API
- Handle customer authentication
- Process webhooks for real-time updates
- Manage inventory and product data

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Payload CMS](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
