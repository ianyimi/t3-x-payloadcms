import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_USERS } from "../constants";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	admin: {
		hidden: ({ user }) => false,
		useAsTitle: 'email',
	},
	fields: []
}
