import { auth } from '~/auth'

export type Session = typeof auth['$Infer']['Session']
export type User = typeof auth['$Infer']['User']
export type Account = Awaited<ReturnType<typeof auth['api']['listUserAccounts']>>[number]
export type DeviceSession = Awaited<ReturnType<typeof auth['api']['listSessions']>>[number]
