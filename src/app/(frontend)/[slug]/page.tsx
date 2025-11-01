import { notFound } from "next/navigation";

import type { Page as PageType } from "~/payload-types"

import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { getPayload } from "~/payload/utils";

interface PageParams {
	params: Promise<{
		slug?: string
	}>
}

export async function generateStaticParams() {
	const payload = await getPayload()
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: false,
		limit: 100,
	})

	const pages = pageRes?.docs

	return pages.map(({ slug }) => {
		if (slug === 'home') {
			return {}
		}
		 
		return { slug }
	})
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { slug = '' } = await paramsPromise
	const payload = await getPayload()

	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: false,
		limit: 1,
		where: {
			slug: {
				equals: slug
			}
		}
	})

	const page = pageRes?.docs?.[0] as null | PageType

	if (page === null) {
		return notFound()
	}

	return (
		<div>page found: {slug}</div>
	)
}
