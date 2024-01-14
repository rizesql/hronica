import { defineField, defineType } from "sanity";

export const social = defineType({
	name: "social",
	title: "Social",
	type: "document",
	fields: [
		defineField({ name: "platform", type: "string", title: "Platform" }),
		defineField({ name: "url", type: "url", title: "URL" }),
	],
});
