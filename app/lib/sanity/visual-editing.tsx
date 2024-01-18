import React from "react";

import { useLocation, useNavigate } from "@remix-run/react";
import type { HistoryUpdate } from "@sanity/overlays";
import { enableOverlays } from "@sanity/overlays";

import { studioUrl } from "./config";

import { client } from "~/lib/sanity/client";
import { useLiveMode } from "~/lib/sanity/loader";

// eslint-disable-next-line import/no-default-export
export default function VisualEditing() {
	const stegaClient = React.useMemo(
		() =>
			client.withConfig({
				stega: {
					enabled: true,
					studioUrl,
				},
			}),
		[],
	);

	const navigateRemix = useNavigate();
	const navigateComposerRef = React.useRef<null | ((update: HistoryUpdate) => void)>(
		null,
	);

	React.useEffect(() => {
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
		}
	}, [navigateRemix]);

	const location = useLocation();
	React.useEffect(() => {
		if (navigateComposerRef.current) {
			navigateComposerRef.current({
				type: "push",
				url: `${location.pathname}${location.search}${location.hash}`,
			});
		}
	}, [location.hash, location.pathname, location.search]);

	useLiveMode({ client: stegaClient });

	return null;
}
