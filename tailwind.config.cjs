/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],

	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				"pp-neue-montreal": "'PP Neue Montreal', sans-serif",
				redaction: "Redaction, serif",
				"libre-caslon-condensed": "'Libre Caslon Condensed', monospace",
			},

			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				"text-secondary": "#292929",
				// border: "#2B2C32",

				"dark-blue": {
					100: "#7D7E82",
					200: "#5A5A5C",
					300: "#2B2C32",
					400: "#181A20",
					500: "#15171D",
					600: "#13151B",
					700: "#12141A",
					800: "#111318",
					900: "#0F1116",
				},

				"off-white": {
					100: "hsl(var(--off-white-100))",
					200: "#C9C9C9",
					300: "#7D7E82",
					600: "#3D3F43",
					900: "#2C2D33",
				},

				temp: {
					100: "hsl(var(--temp))",
				},

				brand: "hsl(var(--brand))",
				"brand-secondary": "hsl(var(--brand-secondary))",

				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				loop: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-50% - 10px))" },
				},
				"loop-reverse": {
					from: { transform: "translateX(calc(-50% - 10px))" },
					to: { transform: "translateX(0)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				loop: "loop 50s linear infinite",
				"loop-reverse": "loop-reverse 50s linear infinite",
			},

			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.foreground"),
						pre: {
							color: theme("colors.grey.100"),
							backgroundColor: theme("colors.grey.100"),
						},
						"pre code::before": {
							"padding-left": "unset",
						},
						"pre code::after": {
							"padding-right": "unset",
						},
						code: {
							backgroundColor: theme("colors.grey.100"),
							color: "#DD1144",
							fontWeight: "400",
							"border-radius": "0.25rem",
						},
						"code::before": {
							content: '""',
							"padding-left": "0.25rem",
						},
						"code::after": {
							content: '""',
							"padding-right": "0.25rem",
						},
						"h1, h2, h3, h4, h5, h6": {
							color: theme("colors.foreground"),
						},
						p: {
							color: theme("colors.foreground"),
						},
						blockquote: {
							"border-left-color": theme("colors.foreground"),
						},
						li: {
							color: theme("colors.foreground"),
							"font-size": "0.875rem",
							"line-height": "1.25rem",
						},
						"li::marker": {
							color: theme("colors.foreground"),
						},
						hr: {
							"border-color": theme("colors.foreground"),
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			}),
		},
	},

	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries"),
	],
};
