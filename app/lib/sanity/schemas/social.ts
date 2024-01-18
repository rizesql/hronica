// import { defineField, defineType } from "sanity";

export const social = {
	name: "social",
	title: "Social",
	type: "document",
	fields: [
		{ name: "platform", type: "string", title: "Platform" },
		{ name: "url", type: "url", title: "URL" },
	],
};
