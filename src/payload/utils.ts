import { getPayload as getPayloadBase } from 'payload'
import config from '@payload-config'

export function getPayload() {
	return getPayloadBase({ config })
}

// Serialize MongoDB ObjectIds to strings
export const serializeMongoDocIDs = (doc: Record<string, any>): any => {
	if (!doc) return doc
	if (typeof doc === 'object' && doc.constructor?.name === 'ObjectId') {
		return doc.toString()
	}
	if (doc?.id && typeof doc.id === 'object' && doc.id.constructor?.name === 'ObjectId') {
		return { ...doc, id: doc.id.toString() }
	}
	if (Array.isArray(doc)) {
		return doc.map(serializeMongoDocIDs)
	}
	if (typeof doc === 'object' && doc !== null) {
		const serialized: any = {}
		for (const key in doc) {
			if (doc.hasOwnProperty(key)) {
				serialized[key] = serializeMongoDocIDs(doc[key])
			}
		}
		return serialized
	}
	return doc
}

