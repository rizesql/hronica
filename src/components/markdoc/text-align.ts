export const textAlign = {
	textAlign: { type: "String", required: false },
};

export type TextAlign = "center" | "end" | undefined;

const textAlignVariants = {
	center: "text-center",
	end: "text-end",
};

export const withTextAlign = (prop: TextAlign) => prop && textAlignVariants[prop];
