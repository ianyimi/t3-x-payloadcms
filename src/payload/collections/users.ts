import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_USERS } from "../constants";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	fields: [
		{
			name: "email",
			type: "text",
			required: true,
			defaultValue: "",
		},
		{
			name: "emailVerified",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
		{
			name: "image",
			type: "text",
		},
		{
			name: "createdAt",
			type: "date",
			required: true,
			defaultValue: new Date(),
		},
		{
			name: "updatedAt",
			type: "date",
			required: true,
			defaultValue: new Date(),
		}
	]
}
