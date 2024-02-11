import type { NavLink, SocialLink } from "~/lib/links";

export const siteUrl = "http://localhost:5173";

export type Image = {
	src: string;
	alt: string;
};

export type SEOMetadata = {
	name: string;
	title: string;
	description: string;
	image: Image;
	canonicalURL?: URL | string | null;
};

export type OpenGraph = Partial<SEOMetadata> & {
	type?: string;
};

export type Twitter = Partial<SEOMetadata> & {
	handle?: string;
	card?: "summary" | "summary_large_image";
};

type SiteInfo = {
	name: string;
	title: string;
	description: string;
	imageSrc: string;
	trademark: string;
	socialLinks: Readonly<SocialLink[]>;
	rizesqlLink: SocialLink;
};

export const seo = {
	name: "Revista hronica",
	title: "",
	description: "",
	imageSrc: "",
	trademark: "Revista hronica ©",
	socialLinks: [
		{
			platform: "facebook",
			url: "https://facebook.com/teamclockworks",
		},
		{
			platform: "instagram",
			url: "https://instagram.com/ro108clockworks",
		},
		{
			platform: "youtube",
			url: "https://youtube.com/@ro108clockworks?sub_confirmation=1",
		},
		{
			platform: "tiktok",
			url: "https://tiktok.com/@team_clockworks_ro108",
		},
	],
	// pentru viitori sincaisti, am facut site-ul asta pe gratis acolo un credit
	// merit si eu. Spor la cafelutsa
	rizesqlLink: {
		platform: "@rizesql",
		url: "https://www.github.com/rizesql",
	},
} as const satisfies SiteInfo;

export const navLinks = [
	{
		label: "navLink.about",
		href: "/about",
	},
	{
		label: "navLink.work",
		href: "/works",
	},
	{
		label: "navLink.blog",
		href: "/blog",
	},
] as const satisfies Readonly<NavLink[]>;

export const _seo = ({
	title,
	description,
	keywords,
	image,
}: {
	title?: string;
	description?: string;
	image?: string;
	keywords?: string;
}) => {
	const tags = [
		{ title: title?.trim() ? `${title} | Revista Hronica` : "Revista Hronica" },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "og:type", content: "website" },
		{ name: "og:title", content: title },
		{ name: "og:description", content: description },
		...(image
			? [
					{ name: "twitter:image", content: image },
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "og:image", content: image },
				]
			: []),
	];

	return tags;
};

// export const categories = ["category1", "category2", "category3", "category4", "category5"] as const;
// export type Category = typeof categories[number];
