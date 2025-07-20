import { env } from "~/env.mjs";
import type { PayloadBetterAuthOptions, PayloadBetterAuthPluginOptions } from "@payload-auth/better-auth-plugin";
import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS, COLLECTION_SLUG_VERIFICATIONS } from "../payload/constants";
import {
	admin,
	apiKey
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
