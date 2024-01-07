import { Flex, Link, Text } from "~/components/ui";
import { seo } from "~/lib/seo";

export function Logo() {
	return (
		<Flex as={Link.Nav} href="/" inline alignment="center/between">
			<Text.H3 className="font-redaction">{seo.name}</Text.H3>
		</Flex>
	);
}
