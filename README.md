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
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
5. Copy the Client ID and Client Secret

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

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payload CMS
PAYLOAD_SECRET="your-payload-secret"
```

Generate secrets using:
```bash
openssl rand -hex 32
```

### 6. Enable Google Provider

Uncomment the Google provider in `src/auth.config.ts`:

```typescript
import google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
```

### 7. Start Development Server

```bash
pnpm dev
```

Your app will be available at `http://localhost:3000`

- Frontend: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

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
