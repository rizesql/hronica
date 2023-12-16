import { fields, singleton } from "@keystatic/core";

export const social = singleton({
	label: "Social",
	path: "src/content/social/",
	format: { data: "json" },
	schema: {
		social: fields.array(
			fields.object({
				platform: fields.text({ label: "Platforma" }),
				url: fields.url({
					label: "URL",
				}),
			}),
			{
				label: "Linkuri de social media",
				itemLabel: (link) => link.fields.platform.value ?? "",
			},
		),
	},
});
