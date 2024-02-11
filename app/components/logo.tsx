import { Flex, Link, Text } from "~/components/ui";
import { appInfo } from "~/lib/app-info";

export function Logo() {
	return (
		<Flex as={Link.Nav} to="/" inline alignment="center/between">
			<Text.H3 className="font-redaction">{appInfo.name}</Text.H3>
		</Flex>
	);
}
