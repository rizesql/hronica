import { useMemberRouteData } from "./member-data";

import { Center, Image, Text, VStack } from "~/components/ui";
import { formatActivity } from "~/lib/api/members/helpers";
import { useQuery } from "~/lib/sanity/loader";

export function Author() {
	const { queries } = useMemberRouteData();
	const member = useQuery(queries.member);

	return (
		<VStack stretch="all" className="gap-6 lg:max-w-xs" alignment="center/center">
			<Center>
				{member.data.photo && (
					<Image
						asset={member.data.photo}
						alt={member.data.name}
						className="aspect-square rounded-md bg-red-100"
					/>
				)}
			</Center>
			<VStack className="gap-2">
				<Text.H1>{member.data.name}</Text.H1>
				<Text.Small className="text-base">Promotia {member.data.promotion}</Text.Small>

				<Text.Small>{formatActivity(member.data.activity)}</Text.Small>
			</VStack>
		</VStack>
	);
}
