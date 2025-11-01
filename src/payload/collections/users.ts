import { type AuthStrategyResult, type CollectionConfig } from "payload";

import { auth } from "~/auth";
import { USER_ROLES } from "~/auth/config";
import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField";
import { serializeMongoDocIDs } from "~/payload/utils";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	admin: {
		hidden: () => false,
		defaultColumns: ['id', 'name', 'email', 'role', 'image'],
		useAsTitle: 'name',
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [
			{
				name: 'better-auth',
				authenticate: async ({ headers, payload }) => {
					try {
						const userSession = await auth.api.getSession({ headers })

						if (!userSession?.user) {return { user: null }}

						const userData = await payload.findByID({
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
							id: userSession?.user?.id,
							collection: COLLECTION_SLUG_USERS,
						})

						const serializedUserData = serializeMongoDocIDs(userData) as Record<string, unknown>

						return {
							user: {
								...serializedUserData,
								collection: COLLECTION_SLUG_USERS,
							},
						} as AuthStrategyResult
					} catch (err) {
						payload.logger.error(err)
						return { user: null }
					}
				},
			},
		],
	},
	endpoints: [
		{
			handler: async (req) => {
				await auth.api.signOut({
					headers: req.headers,
				})
				return Response.json(
					{
						message: 'Token revoked successfully',
					},
					{
						headers: req.headers,
						status: 200,
					},
				)
			},
			method: 'post',
			path: '/logout',
		},
	],
	fields: [
		{
			name: 'email',
			type: 'email',
			required: true,
			unique: true,
		},
		{
			name: 'emailVerified',
			type: 'checkbox',
			defaultValue: false,
			required: true,
		},
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'image',
			type: 'text',
		},
		selectEnumField({
			name: "role",
			defaultValue: USER_ROLES.user,
			object: USER_ROLES,
			required: true
		}),
	]
}
