import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-images/options";

export type WithOGImage = {
	ogImageUrl: string;
} & Record<string, unknown>;

export const seo = ({
	title: rawTitle,
	description,
	data,
}: {
	title?: string;
	description?: string;
	data?: WithOGImage;
}) => {
	const _title = rawTitle?.trim();
	const title = _title ? `${_title} | Revista Hronica` : "Revista Hronica";

	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "og:type", content: "website" },
		{ name: "og:title", content: title },
		{ name: "og:description", content: description },
		...(data
			? [
					{ name: "twitter:image", content: data.ogImageUrl },
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "og:image", content: data.ogImageUrl },
					{ name: "og:image:width", content: OG_IMAGE_WIDTH },
					{ name: "og:image:height", content: OG_IMAGE_HEIGHT },
				]
			: []),
	];

	return tags;
};
