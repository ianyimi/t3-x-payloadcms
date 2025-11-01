import { nextCookies } from "better-auth/next-js";
import {
	admin,
	apiKey,
} from "better-auth/plugins"

export const USER_ROLES = {
	admin: 'admin',
	user: 'user'
} as const
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const betterAuthPlugins = [
	admin({
		adminRoles: [USER_ROLES.admin],
		defaultRole: USER_ROLES.user
	}),
	apiKey(),
	nextCookies(),
]
export type BetterAuthPlugins = typeof betterAuthPlugins
