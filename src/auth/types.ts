import { type getPayloadAuth } from '~/payload/auth'

type PayloadWithBetterAuth = Awaited<ReturnType<typeof getPayloadAuth>>

export type Session = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']
export type User = PayloadWithBetterAuth['betterAuth']['$Infer']['User']
export type Account = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listUserAccounts']>>[number]
export type DeviceSession = Awaited<ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listSessions']>>[number]
