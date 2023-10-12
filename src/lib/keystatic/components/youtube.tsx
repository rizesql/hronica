import { NotEditable, component, fields } from "@keystatic/core";

const Preview = ({ id }: { id: string }) => (
	<NotEditable>
		<a href={id} target="_blank" referrerPolicy="no-referrer">
			{id}
		</a>
	</NotEditable>
);

export const youtube = component({
	label: "Youtube video",
	schema: {
		id: fields.text({ label: "Link" }),
	},
	preview: ({ fields }) => <Preview id={fields.id.value} />,
});
