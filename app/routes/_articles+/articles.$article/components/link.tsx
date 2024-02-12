import { type PortableTextMarkComponentProps } from "@portabletext/react";

import { Link as Link_ } from "~/components/ui";

export function Link({
	children,
	value,
}: PortableTextMarkComponentProps<{ _type: string; href: string }>) {
	return (
		<Link_.Social className="font-pp-neue-montreal underline" href={value!.href}>
			{children}
		</Link_.Social>
	);
}
