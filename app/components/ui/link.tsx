import React from "react";

import { Link as Link_ } from "@remix-run/react";
import { type RemixLinkProps } from "@remix-run/react/dist/components";
import { ArrowUpRight } from "lucide-react";

import { cn } from "~/lib/cn";

type NavLinkProps = {
	disabled?: boolean;
} & React.ComponentPropsWithRef<"a"> &
	RemixLinkProps;

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
	{ disabled, className, ...props },
	ref?,
) {
	if (disabled) return <span ref={ref} {...props} />;

	return (
		<Link_
			rel="prefetch"
			className={cn(
				disabled && "pointer-events-none text-off-white-100",
				className ?? "",
			)}
			{...props}
		/>
	);
});

// TODO should be named ExternalLink?
type SocialLinkProps = {
	href: string;
	noIcon?: boolean;
} & React.ComponentPropsWithRef<"a">;

const SocialLink = React.forwardRef<HTMLAnchorElement, SocialLinkProps>(
	function SocialLink({ href, className, children, noIcon = false, ...props }, ref?) {
		return (
			<Link_
				ref={ref}
				target="_blank"
				referrerPolicy="no-referrer"
				className={cn("hover: inline-flex items-center justify-center gap-2", className)}
				to={href}
				{...props}
			>
				{children}
				{!noIcon && <ArrowUpRight className="size-4" />}
			</Link_>
		);
	},
);

export const Link = {
	Nav: NavLink,
	Social: SocialLink,
};
