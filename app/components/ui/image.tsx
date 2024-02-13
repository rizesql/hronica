import { type PolymorphicComponentProps } from ".";

import { getImageProps } from "~/lib/sanity/loader";

export const Image = ({
	asset,
	isInline = false,
	alt,
	className,
	...props
}: {
	asset: { _ref: string };
	alt: string;
	isInline?: boolean | undefined;
	className?: string | undefined;
} & Omit<PolymorphicComponentProps<"img">, "as">) => {
	return (
		<img
			alt={alt}
			style={{
				display: isInline ? "inline-block" : "block",
				// aspectRatio: width / height,
			}}
			className={className}
			{...getImageProps({ asset, maxWidth: 600 })}
			{...props}
		/>
	);
};
