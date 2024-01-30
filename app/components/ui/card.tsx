import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Flex, type FlexProps } from "./flex";
import type {
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from "./polymorphic-component";

import { cn } from "~/lib/cn";

type CardRootProps<C extends React.ElementType = "div"> =
	PolymorphicComponentPropsWithRef<C>;

type CardRootComponent = <C extends React.ElementType = "div">(
	props: CardRootProps<C>,
) => React.ReactNode | null;

const Root: CardRootComponent = React.forwardRef(function Root<
	C extends React.ElementType = "div",
>(
	{
		className,
		// variant, shape,
		...props
	}: CardRootProps<C>,
	ref?: PolymorphicRef<C>,
) {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		<Flex
			inline
			direction="col"
			alignment="start/between"
			ref={ref}
			className={cn("gap-4 rounded-lg p-4", className)}
			{...props}
		/>
	);
});

type CardHeaderProps<C extends React.ElementType = "div"> =
	PolymorphicComponentPropsWithRef<C, FlexProps<C>>;

type CardHeaderComponent = <C extends React.ElementType = "div">(
	props: CardHeaderProps<C>,
) => React.ReactNode | null;

const Header: CardHeaderComponent = React.forwardRef(function Header<
	C extends React.ElementType = "div",
>({ className, as, ...props }: CardHeaderProps<C>, ref: PolymorphicRef<C>) {
	const Element = as ?? "div";

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return <Element ref={ref} className={className} {...props} />;
});

const cardContentVariants = cva("w-full rounded-md", {
	variants: {
		variant: {
			default: "border-border",
			alternative: "ring-2 ring-off-white-900/40",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type CardContentProps = Partial<VariantProps<typeof cardContentVariants>> &
	React.HTMLAttributes<HTMLDivElement>;

const Content = React.forwardRef<HTMLDivElement, CardContentProps>(function Content(
	{ className, variant, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn(cardContentVariants({ variant }), className)}
			{...props}
		/>
	);
});

export const Card = {
	Root,
	Header,
	Content,
};
