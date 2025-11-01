"use client"

import { LogIn, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'

import type { Session } from '~/auth/types'

import { authClient } from '~/auth/client'
import { Button } from '~/ui/button'

export default function SignInClient({ session }: { session: null | Session }) {
	const router = useRouter()

	async function handleAuth() {
		if (session?.session && session.session.expiresAt.getTime() >= Date.now()) {
			await authClient.signOut()
			return router.refresh()
		}
		return authClient.signIn.social({ provider: "google" })
	}

	return (
		<Button className="justify-between cursor-pointer gap-2" onClick={handleAuth} variant="default">
			{!session?.session ? (
				<LogOut size={20} />
			) : (
				<LogIn size={20} />
			)}
			<span>{session?.session ? 'Sign Out' : 'Sign In'}</span>
		</Button>
	)
}


