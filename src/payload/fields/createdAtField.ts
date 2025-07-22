import type { DateField } from "~/payload/fields"

export default function createdAtField<T extends Record<string, string>>(): DateField {
	return {
		name: "createdAt",
		type: "date",
	}
}
