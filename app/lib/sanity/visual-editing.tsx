import React from "react";

import { useLocation, useNavigate } from "@remix-run/react";
import type { HistoryUpdate } from "@sanity/overlays";
import { enableOverlays } from "@sanity/overlays";

import { client } from "~/lib/sanity/client";
import { useLiveMode } from "~/lib/sanity/loader";

type VisualEditingProps = {
	studioUrl: string;
};

// Default export required for React Lazy loading
// eslint-disable-next-line import/no-default-export
export default function VisualEditing({ studioUrl }: VisualEditingProps) {
	const stegaClient = React.useMemo(
		() =>
			client.withConfig({
				stega: {
					enabled: true,
					studioUrl,
				},
			}),
		[studioUrl],
	);

	const navigateRemix = useNavigate();
	const navigateComposerRef = React.useRef<null | ((update: HistoryUpdate) => void)>(
		null,
	);

	React.useEffect(() => {
		// When displayed inside an iframe
		if (window.parent !== window.self) {
			const disable = enableOverlays({
				zIndex: 999999,
				history: {
					subscribe: (navigate) => {
						navigateComposerRef.current = navigate;
						return () => {
							navigateComposerRef.current = null;
						};
					},
					update: (update) => {
						if (update.type === "push" || update.type === "replace") {
							navigateRemix(update.url, { replace: update.type === "replace" });
						} else if (update.type === "pop") {
							navigateRemix(-1);
						}
					},
				},
			});
			return () => disable();
		} else {
			if (typeof document !== "undefined") {
				console.warn(
					`Stega is enabled but Visual Editing is configured to only display in an iframe.`,
				);
			}
		}
	}, [navigateRemix, studioUrl]);

	const location = useLocation();
	React.useEffect(() => {
		if (navigateComposerRef.current) {
			navigateComposerRef.current({
				type: "push",
				url: `${location.pathname}${location.search}${location.hash}`,
			});
		}
	}, [location.hash, location.pathname, location.search]);

	// Enable live queries from the specified studio origin URL
	useLiveMode({ client: stegaClient });

	return null;
}
