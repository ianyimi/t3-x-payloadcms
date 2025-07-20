import { getPayloadAuth } from "~/payload/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Create handlers using the Better Auth Next.js helper
export async function GET(request: Request) {
	try {
		const payload = await getPayloadAuth()
		const handler = toNextJsHandler(payload.betterAuth)
		return handler.GET(request)
	} catch (error) {
		console.error('Error in Better Auth GET handler:', error)
		return new Response('Internal Server Error', { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const payload = await getPayloadAuth()
		const handler = toNextJsHandler(payload.betterAuth)
		return handler.POST(request)
	} catch (error) {
		console.error('Error in Better Auth POST handler:', error)
		return new Response('Internal Server Error', { status: 500 })
	}
}