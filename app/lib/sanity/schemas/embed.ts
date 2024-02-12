import { EmbedIcon, EmbedPreview } from "../ui/embed";

export const embed = {
	name: "embed",
	type: "object",
	title: "Embed",
	fields: [
		{
			name: "url",
			type: "url",
			title: "URL",
		},
	],
	preview: {
		select: { url: "url" },
		prepare(selection) {
			const { url } = selection;
			return {
				title: url ?? "Select a URL",
			};
		},
		component: EmbedPreview,
	},
	icon: EmbedIcon,
};
