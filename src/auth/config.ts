import { env } from "~/env.mjs";
import type { PayloadBetterAuthOptions, PayloadBetterAuthPluginOptions } from "@payload-auth/better-auth-plugin";
import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS, COLLECTION_SLUG_VERIFICATIONS } from "../payload/constants";
import {
	admin,
	apiKey,
} from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";

export const USER_ROLES = {
	admin: 'admin',
	user: 'user'
} as const
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const betterAuthPlugins = [
	admin({
		defaultRole: USER_ROLES.user,
		adminRoles: [USER_ROLES.admin]
	}),
	apiKey(),
	nextCookies(),
]
export type BetterAuthPlugins = typeof betterAuthPlugins

export const betterAuthConfig: PayloadBetterAuthOptions = {
	appName: 'Markitect',
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL],
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		google: {
			enabled: true,
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	// @ts-expect-error mismatch auth types, may be due to user collection in mongodb
	plugins: betterAuthPlugins
};

export const pluginOptions: PayloadBetterAuthPluginOptions = {
	disabled: false,
	hidePluginCollections: false,
	disableDefaultPayloadAuth: true,
	users: {
		slug: COLLECTION_SLUG_USERS,
		hidden: false,
		roles: Object.values(USER_ROLES),
		adminRoles: [USER_ROLES.admin],
		// @ts-expect-error additional collection config
		auth: {
			useSession: false
		},
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: USER_ROLES.user,
				input: false
			}
		}
	},
	accounts: {
		slug: COLLECTION_SLUG_ACCOUNTS
	},
	sessions: {
		slug: COLLECTION_SLUG_SESSIONS,
	},
	verifications: {
		slug: COLLECTION_SLUG_VERIFICATIONS
	},
	betterAuthOptions: betterAuthConfig
}
