import type { DateField } from "~/payload/fields"

export default function updatedAtField<T extends Record<string, string>>(): DateField {
	return {
		name: "updatedAt",
		type: "date",
	}
}
