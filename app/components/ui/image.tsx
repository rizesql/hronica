import { getImageDimensions } from "@sanity/asset-utils";

import { image } from "~/lib/sanity/loader";

export const Image = ({
	asset,
	isInline = false,
	alt,
}: {
	asset: { _ref: string };
	alt: string;
	isInline?: boolean | undefined;
}) => {
	const { width, height } = getImageDimensions(asset);

	return (
		<img
			src={image(asset).fit("max").format("webp").auto("format").url()}
			alt={alt}
			loading="lazy"
			style={{
				display: isInline ? "inline-block" : "block",
				aspectRatio: width / height,
			}}
		/>
	);
};
