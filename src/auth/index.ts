import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"
import { env } from "~/env.mjs"
import { betterAuthPlugins, USER_ROLES } from "./config"
import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS, COLLECTION_SLUG_VERIFICATIONS } from "~/payload/constants"

const client = new MongoClient(env.DATABASE_URI)
const db = client.db()

export const auth = betterAuth({
	database: mongodbAdapter(db),
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true
	},
	user: {
		modelName: COLLECTION_SLUG_USERS,
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: USER_ROLES.user,
				input: false
			},
			banned: {
				type: "boolean",
				required: true,
				defaultValue: false,
				input: false
			},
			banReason: {
				type: "string",
				required: false,
				input: false
			},
			banExpires: {
				type: "date",
				required: false,
				input: false
			}
		}
	},
	session: {
		modelName: COLLECTION_SLUG_SESSIONS,
		additionalFields: {
			impersonatedBy: {
				type: "string",
				required: false,
				input: false
			}
		}
	},
	account: {
		modelName: COLLECTION_SLUG_ACCOUNTS
	},
	verification: {
		modelName: COLLECTION_SLUG_VERIFICATIONS
	},
	socialProviders: {
		google: {
			enabled: true,
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: betterAuthPlugins
})
