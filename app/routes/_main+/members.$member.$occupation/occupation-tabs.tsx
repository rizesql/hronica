import { useMemberRouteData } from "./member-data";

import { HStack, Link, Separator, Text, VStack } from "~/components/ui";
import { useQuery } from "~/lib/sanity/loader";

export function OccupationTabs() {
	const { queries } = useMemberRouteData();
	const member = useQuery(queries.member);

	if (member.data.occupation !== "author-and-editor") return null;

	return (
		<VStack className="sticky top-[10rem] bg-background pt-8 lg:top-[8rem] lg:pl-8 lg:pr-4">
			<HStack stretch="width" className="gap-x-8 px-4 pb-2" alignment="baseline/start">
				<Text.P className="font-redaction text-xl font-bold italic">Activitate:</Text.P>

				<Link.Nav
					to={`/members/${member.data._slug}/author`}
					reloadDocument
					className="pb-1 transition-all hover:underline"
				>
					<Text.Small>Autor</Text.Small>
				</Link.Nav>

				<Link.Nav
					to={`/members/${member.data._slug}/editor`}
					reloadDocument
					className="pb-1 transition-all hover:underline"
				>
					<Text.Small>Editor</Text.Small>
				</Link.Nav>
			</HStack>

			<Separator />
		</VStack>
	);
}
