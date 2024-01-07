import React from "react";

import { Link as Link_ } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "~/lib/cn";

type NavLinkProps = {
	disabled?: boolean;
	href: string;
} & React.ComponentPropsWithRef<"a">;

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
	{ disabled, className, ...props },
	ref?,
) {
	if (disabled) return <span ref={ref} {...props} />;

	const { href, ...other } = props;

	return (
		<Link_
			to={href}
			rel="prefetch"
			className={cn(
				disabled && "pointer-events-none text-off-white-100",
				className ?? "",
			)}
			{...other}
		/>
	);
});

// TODO should be named ExternalLink?
type SocialLinkProps = { href: string } & React.ComponentPropsWithRef<"a">;

const SocialLink = React.forwardRef<HTMLAnchorElement, SocialLinkProps>(
	function SocialLink({ href, className, children, ...props }, ref?) {
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
				<ArrowUpRight className="h-4 w-4" />
			</Link_>
		);
	},
);

export const Link = {
	Nav: NavLink,
	Social: SocialLink,
};
