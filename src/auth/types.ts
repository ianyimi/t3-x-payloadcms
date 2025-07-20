import { type getPayloadAuth } from '~/payload/auth'
import type { UserRole } from './config'

type PayloadWithBetterAuth = Awaited<ReturnType<typeof getPayloadAuth>>

export type Session = PayloadWithBetterAuth['betterAuth']['$Infer']['Session'] & { user: { role: UserRole } }
export type User = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']['user']
export type Account = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listUserAccounts']>>[number]
export type DeviceSession = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listSessions']>>[number]
