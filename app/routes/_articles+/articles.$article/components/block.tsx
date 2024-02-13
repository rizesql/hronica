/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/heading-has-content */

import { type PortableTextBlockComponent } from "@portabletext/react";

import { cn } from "~/lib/cn";

const baseStyle = cn("font-redaction [text-wrap:balance] scroll-m-28");

export const block: PortableTextBlockComponent = ({
	isInline: _isInline,
	renderNode: _renderNode,
	...props
}) => {
	const text = {
		h1: <h1 className={cn(baseStyle, "text-6xl font-bold")} {...props} />,
		h2: <h2 className={cn(baseStyle, "text-5xl font-bold")} {...props} />,
		h3: <h3 className={cn(baseStyle, "text-4xl font-bold")} {...props} />,
		h4: <h4 className={cn(baseStyle, "text-2xl font-bold")} {...props} />,
		h5: <h5 className={cn(baseStyle, "text-xl font-bold")} {...props} />,
		h6: <h6 className={cn(baseStyle, "text-lg font-bold")} {...props} />,
		normal: <p className="mt-8 text-sm" {...props} />,
	};

	const all = { ...text, default: <span {...props} /> };
	return all[(props.value.style as keyof typeof all) ?? "default"];
};
