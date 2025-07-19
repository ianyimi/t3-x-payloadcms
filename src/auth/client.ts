import { createAuthClient } from 'better-auth/react'
import { env } from '~/env.mjs';
import {
	adminClient,
	apiKeyClient
} from "better-auth/client/plugins";
import { type getPayload } from '~/payload/auth'

type PayloadWithBetterAuth = Awaited<ReturnType<typeof getPayload>>

export type Session = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']
// export type ActiveOrganization = PayloadWithBetterAuth['betterAuth']['$Infer']['ActiveOrganization']
// export type Invitation = PayloadWithBetterAuth['betterAuth']['$Infer']['Invitation']
export type Account = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listUserAccounts']>>[number]
export type DeviceSession = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listSessions']>>[number]

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [
		adminClient(),
		apiKeyClient()
	]
})

export const { signIn, signOut, useSession } = authClient
