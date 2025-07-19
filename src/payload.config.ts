import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { env } from "~/env.mjs";
import { pluginOptions } from "~/auth/config";
import { payloadBetterAuth } from "@payload-auth/better-auth-plugin"
import { collections } from "./payload/collections";

export default buildConfig({
	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Define and configure your collections in this array
	collections: collections,

	cors: [`${env.NEXT_PUBLIC_BETTER_AUTH_URL}`],
	csrf: [`${env.NEXT_PUBLIC_BETTER_AUTH_URL}`],
	serverURL: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}`,

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: env.PAYLOAD_SECRET || "",
	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: env.DATABASE_URI || "",
	}),

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,

	plugins: [
		// @ts-expect-error mismatch plugin types for some reason I am unsure about right now
		payloadBetterAuth(pluginOptions),
	],
});
