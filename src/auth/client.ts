import { createAuthClient } from 'better-auth/react'
import { env } from '~/env.mjs';
import {
	adminClient,
	apiKeyClient
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	basePath: "/api/auth", 
	plugins: [
		adminClient(),
		apiKeyClient()
	]
})

export const { signIn, signOut, useSession } = authClient
