import { env } from "./env.mjs";
import type { PayloadBetterAuthOptions, PayloadBetterAuthPluginOptions } from "@payload-auth/better-auth-plugin";
import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS, COLLECTION_SLUG_VERIFICATIONS } from "./payload/constants";

export const USER_ROLES = {
	admin: 'admin',
	user: 'user'
} as const
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// export const betterAuthPlugins = createBetterAuthPlugins()
// export type BetterAuthPlugins = ReturnType<typeof createBetterAuthPlugins>

export const betterAuthConfig: PayloadBetterAuthOptions = {
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
};

export const pluginOptions: PayloadBetterAuthPluginOptions = {
	disabled: false,
	hidePluginCollections: true,
	users: {
		slug: COLLECTION_SLUG_USERS,
		hidden: false,
		adminRoles: [USER_ROLES.admin],
	},
	accounts: {
		slug: COLLECTION_SLUG_ACCOUNTS
	},
	sessions: {
		slug: COLLECTION_SLUG_SESSIONS
	},
	verifications: {
		slug: COLLECTION_SLUG_VERIFICATIONS
	},
	betterAuthOptions: betterAuthConfig
}
