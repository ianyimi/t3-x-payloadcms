import { headers } from 'next/headers'
import { auth } from '~/auth'
import SignInClient from './client'
import { validateSession } from '~/auth/utils'

export default async function SignInButton() {
	const session = await auth.api.getSession({ headers: await headers() })

	console.log('session: ', session)
	if (session) {
		console.log('valid session: ', await validateSession(session))
	}

	return <SignInClient session={session} />
}

