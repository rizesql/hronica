import React from "react";

import type {
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from "./polymorphic-component";
import { HStack } from "./stack";

import { cn } from "~/lib/cn";

type Props = {
	color: string;
	children: React.ReactNode;
};

type BadgeProps<C extends React.ElementType = "span"> = PolymorphicComponentPropsWithRef<
	C,
	Props
>;

type BadgeComponent = <C extends React.ElementType = "span">(
	props: BadgeProps<C>,
) => React.ReactNode | null;

export const Badge: BadgeComponent = React.forwardRef(function Badge<
	C extends React.ElementType = "span",
>({ children, className, color, ...props }: BadgeProps<C>, ref?: PolymorphicRef<C>) {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		<HStack
			alignment="center/between"
			ref={ref}
			inline
			className={cn(
				"gap-2 rounded-full px-3 py-1 text-center text-xs uppercase text-foreground",
				className,
			)}
			style={{ background: color }}
			{...props}
		>
			{children}
		</HStack>
	);
});
