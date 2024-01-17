import { cn } from "~/lib/cn";

type TextProps<C extends React.ElementType> = React.ComponentPropsWithoutRef<C>;

const H1 = ({ className, ...props }: TextProps<"h1">) => {
	return (
		<h1
			className={cn("font-redaction text-5xl font-bold [text-wrap:balance]", className)}
			{...props}
		/>
	);
};

const H2 = ({ className, ...props }: TextProps<"h2">) => {
	return (
		<h2
			className={cn("font-redaction text-4xl [text-wrap:balance]", className)}
			{...props}
		/>
	);
};

const H3 = ({ className, ...props }: TextProps<"h3">) => {
	return (
		<h3
			className={cn("font-redaction text-xl [text-wrap:balance]", className)}
			{...props}
		/>
	);
};

const P = ({ className, ...props }: TextProps<"p">) => {
	return <p className={cn("text-sm [text-wrap:balance]", className)} {...props} />;
};

const Small = ({ className, ...props }: TextProps<"p">) => {
	return (
		<p
			className={cn(
				"text-xs uppercase tracking-wider text-text-secondary [text-wrap:balance]",
				className,
			)}
			{...props}
		/>
	);
};

const Tiny = ({ className, ...props }: TextProps<"p">) => {
	return <p className={cn("text-xs text-text-secondary", className)} {...props} />;
};

export const Text = {
	H1,
	H2,
	H3,
	P,
	Small,
	Tiny,
};
