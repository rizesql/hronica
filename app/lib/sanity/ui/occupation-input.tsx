// import { createElement } from "react";

// import { Stack, Button, Grid, Label, Text } from "@sanity/ui";
// import { type StringInputProps, set } from "sanity";

// import { occupation } from "../schemas/occupation";

// export function OccupationInput(props: StringInputProps) {
// 	const { value, onChange } = props;

// 	return (
// 		<Grid columns={occupation.length} gap={3}>
// 			{occupation.map((occupation) => (
// 				<Button
// 					key={occupation.value}
// 					value={occupation.value}
// 					mode={value === occupation.value ? `default` : `ghost`}
// 					tone={value === occupation.value ? `primary` : `default`}
// 				>
// 					<Stack space={3} padding={2}>
// 						<Text size={4} align="right">
// 							{createElement(occupation.icon)}
// 						</Text>
// 						<Label>{occupation.title}</Label>
// 						<Text>{occupation.description}</Text>
// 					</Stack>
// 				</Button>
// 			))}
// 		</Grid>
// 	);
// }
