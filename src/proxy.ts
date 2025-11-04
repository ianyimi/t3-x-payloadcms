import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { auth } from "~/auth"

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname === "/") {
		return NextResponse.next()
	}

	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/sign-in|auth/sign-up|$).*)"],
};
