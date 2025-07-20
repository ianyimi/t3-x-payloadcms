import type { Account, DeviceSession, Session } from '~/auth/types'
import { headers as requestHeaders } from 'next/headers'
import { getPayloadAuth } from '~/payload/auth'

export const getSession = async () => {
	const payload = await getPayloadAuth()
	const headers = await requestHeaders()
	const session = await payload.betterAuth.api.getSession({ headers })
	return session
}

export const validateSession = async (session: Session) => {
	if (!session?.session || !session.user) {
		return {
			valid: false,
			error: 'invalid session or user'
		}
	}
	if (session.session.expiresAt.getTime() <= Date.now()) {
		return {
			valid: false,
			error: 'session expired'
		}
	}

	// Check if user is banned - with proper null checking
	if (session.user && 'banned' in session.user && session.user.banned) {
		return {
			valid: false,
			error: 'banned user'
		}
	}

	return {
		valid: true,
	}
}

export const getUserAccounts = async (): Promise<Account[]> => {
	const payload = await getPayloadAuth()
	const headers = await requestHeaders()
	const accounts = await payload.betterAuth.api.listUserAccounts({ headers })
	return accounts
}

export const getDeviceSessions = async (): Promise<DeviceSession[]> => {
	const payload = await getPayloadAuth()
	const headers = await requestHeaders()
	const sessions = await payload.betterAuth.api.listSessions({ headers })
	return sessions
}

export const currentUser = async () => {
	const payload = await getPayloadAuth()
	const headers = await requestHeaders()
	const session = await payload.betterAuth.api.getSession({ headers })
	return session?.user || null
}

export const getContextProps = () => {
	const sessionPromise = getSession()
	const userAccountsPromise = getUserAccounts()
	const deviceSessionsPromise = getDeviceSessions()
	const currentUserPromise = currentUser()
	return { sessionPromise, userAccountsPromise, deviceSessionsPromise, currentUserPromise }
}
