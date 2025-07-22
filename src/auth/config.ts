import { env } from "~/env.mjs";
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
