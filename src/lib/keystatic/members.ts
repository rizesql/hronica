import { collection, fields } from "@keystatic/core";

export const members = collection({
	label: "Members",
	slugField: "name",
	path: "src/content/members/*",
	format: { data: "json" },
	schema: {
		name: fields.slug({ name: { label: "Name" } }),

		occupation: fields.select({
			label: "Pozitie",
			defaultValue: "author",
			options: [
				{ label: "Autor", value: "author" },
				{ label: "Corector", value: "editor" },
				{ label: "Autor si Corector", value: "author-and-editor" },
			],
		}),

		class: fields.select({
			label: "Clasa",
			defaultValue: "a",
			options: [
				{ label: "A", value: "a" },
				{ label: "B", value: "b" },
				{ label: "C", value: "c" },
				{ label: "D", value: "d" },
				{ label: "E", value: "e" },
				{ label: "F", value: "f" },
				{ label: "G", value: "g" },
				{ label: "H", value: "h" },
			],
		}),

		promotion: fields.integer({
			label: "Promotia",
			description:
				"Alege anul in care ai inceput liceul, pentru a determina promotia din care faci parte. (eg. 2019 -> faci parte din promotia 2019-2023). \n IMPORTANT! Nu introduce o data mai inaintata de anul curent.",
			defaultValue: new Date(Date.now()).getFullYear(),
			validation: {
				isRequired: true,
				min: 1980,
				max: new Date(Date.now()).getFullYear() + 1,
			},
		}),

		seniority: fields.object(
			{
				begin: fields.integer({
					label: "Anul inceperii",
					validation: {
						isRequired: true,
						min: 1980,
						max: new Date(Date.now()).getFullYear() + 1,
					},
				}),
				end: fields.integer({
					label: "Anul incheierii",
					description: "Daca inca esti activ(ă) in echipa, lasa acest camp gol",
				}),
			},
			{ label: "Vechimea in echipa Hronicii" },
		),

		photo: fields.image({
			label: "Poza de profil",
			description: "(optional)",
		}),

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
