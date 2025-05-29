import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import { env } from "./env.mjs";

export const authConfig: NextAuthConfig = {
	providers: [
		google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
};
