"use client"

import { LogIn, LogOut } from "lucide-react"
import Link from "next/link"

import type { Session } from '~/auth/types'

import { Button } from '~/ui/button'

export default function SignInClient({ session }: { session: null | Session }) {

	return (
		<Link href="/auth/sign-in">
			<Button className="justify-between cursor-pointer gap-2" variant="default">
				{!session?.session ? (
					<LogOut size={20} />
				) : (
					<LogIn size={20} />
				)}
				<span>{session?.session ? 'Sign Out' : 'Sign In'}</span>
			</Button>
		</Link>
	)
}


