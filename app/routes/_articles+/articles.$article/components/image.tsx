import { type PortableTextComponentProps } from "@portabletext/react";

import { Image as Image_ } from "~/components/ui";

export function Image({
	value,
	isInline,
}: PortableTextComponentProps<{ asset: { _ref: string } }>) {
	return <Image_ asset={value.asset} isInline={isInline} alt="" />;
}
