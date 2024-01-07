import type { SocialLink, NavLink } from "~/lib/links";

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
	trademark: "2023 Revista hronica ©",
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

// export const categories = ["category1", "category2", "category3", "category4", "category5"] as const;
// export type Category = typeof categories[number];
