import { headers } from 'next/headers'
import { auth } from '~/auth'
import SignInClient from './client'

export default async function SignInButton() {
	const session = await auth.api.getSession({ headers: await headers() })

	console.log('session: ', session)

	return <SignInClient session={session} />
}

