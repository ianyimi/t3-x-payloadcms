import configPromise from '@payload-config'
import { getPayloadWithAuth } from '@payload-auth/better-auth-plugin'
import { type BetterAuthPlugins } from '~/auth/config'

export function getPayloadAuth() {
	// @ts-expect-error mismatched auth config types, unsure why as of now
	return getPayloadWithAuth<BetterAuthPlugins>(configPromise)
}
