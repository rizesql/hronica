import { getImageDimensions } from "@sanity/asset-utils";

import { image } from "~/lib/sanity/loader";

// million-ignore
export const Image = ({
	asset,
	isInline = false,
	alt,
	className,
}: {
	asset: { _ref: string };
	alt: string;
	isInline?: boolean | undefined;
	className?: string | undefined;
}) => {
	const { width, height } = getImageDimensions(asset);

	return (
		<img
			key={asset._ref}
			src={image(asset).fit("max").format("webp").auto("format").url()}
			alt={alt}
			// loading="lazy"
			style={{
				display: isInline ? "inline-block" : "block",
				aspectRatio: width / height,
			}}
			width={width}
			height={height}
			className={className}
			sizes="
			(max-width: 768px) 100vw,
			(max-width: 1200px) 50vw,
			40vw"
		/>
	);
};
