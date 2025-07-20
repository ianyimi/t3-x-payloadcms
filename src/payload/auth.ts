import configPromise from '@payload-config'
import { getPayloadWithAuth, type BetterAuthReturn } from '@payload-auth/better-auth-plugin'
import { type BetterAuthPlugins } from '~/auth/config'
import type { BasePayload } from 'payload'
import type { betterAuth } from 'better-auth'

// @ts-expect-error mismatched auth config types, unsure why as of now
export function getPayloadAuth(): Promise<BasePayload & { betterAuth: BetterAuthReturn<BetterAuthPlugins> }> {
	// @ts-expect-error mismatched auth config types, unsure why as of now
	return getPayloadWithAuth<BetterAuthPlugins>(configPromise)
}
