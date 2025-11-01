import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { customSession } from "better-auth/plugins"
import { MongoClient } from "mongodb"

import { env } from "~/env.mjs"
import {
	COLLECTION_SLUG_ACCOUNTS,
	COLLECTION_SLUG_SESSIONS,
	COLLECTION_SLUG_USERS,
	COLLECTION_SLUG_VERIFICATIONS
} from "~/payload/constants"
import { getPayload, serializeMongoDocIDs } from "~/payload/utils"

import { betterAuthPlugins, USER_ROLES } from "./config"

const client = new MongoClient(env.DATABASE_URI)
const db = client.db()

export const auth = betterAuth({
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			enabled: true,
		},
	},
	account: {
		modelName: COLLECTION_SLUG_ACCOUNTS
	},
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true
	},
	plugins: [
		...(betterAuthPlugins ?? []),
		customSession(async ({ session, user }) => {
			const payload = await getPayload()
			const existingUser = await payload.findByID({
				id: user.id,
				collection: COLLECTION_SLUG_USERS
			})
			const serializedUser = serializeMongoDocIDs(existingUser) as Record<string, unknown>
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				session: serializeMongoDocIDs(session),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				user: {
					...serializeMongoDocIDs(user),
					role: serializedUser.role
				}
			}
		})
	],
	secret: env.BETTER_AUTH_SECRET,
	session: {
		modelName: COLLECTION_SLUG_SESSIONS
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: USER_ROLES.user,
				input: false,
				required: true
			}
		},
		modelName: COLLECTION_SLUG_USERS
	},
	verification: {
		modelName: COLLECTION_SLUG_VERIFICATIONS
	}
})
