import "server-only";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache, type ReactNode, Suspense } from "react";

import { appRouter, createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

import { createQueryClient } from "./query-client";

const getServerQueryClient = cache(createQueryClient)

export async function createTRPCServer() {
	const trpcContext = await createTRPCContext({ headers: await headers() })
	const trpc = createTRPCOptionsProxy({
		ctx: trpcContext,
		queryClient: getServerQueryClient,
		router: appRouter
	})
	const api = createCaller(trpcContext)
	return { api, queryClient: getServerQueryClient(), trpc }
}

export function HydrateClient({
	children,
	fallback = null
}: { children: ReactNode, fallback?: ReactNode }) {
	const queryClient = getServerQueryClient()
	return (
		<Suspense fallback={fallback} >
			<HydrationBoundary state={dehydrate(queryClient)}>
				{children}
			</HydrationBoundary>
		</Suspense>
	)
}
