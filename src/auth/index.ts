import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"
import { env } from "~/env.mjs"

const client = new MongoClient(env.DATABASE_URI)
const db = client.db()

export const auth = betterAuth({
	database: mongodbAdapter(db)
})
