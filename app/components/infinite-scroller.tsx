import React from "react";

export function InfiniteScroller({
	children,
	loadNext,
	loading,
}: {
	children: React.ReactNode;
	loading: boolean;
	loadNext: () => void;
}) {
	const scrollListener = React.useRef(loadNext);

	React.useEffect(() => {
		scrollListener.current = loadNext;
	}, [loadNext]);

	const onScroll = React.useCallback(() => {
		const documentHeight = document.documentElement.scrollHeight;
		const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
		const scrollEnded = documentHeight == scrollDifference;

		if (scrollEnded && !loading) {
			scrollListener.current();
		}
	}, [loading]);

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", onScroll);
		}

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [onScroll]);

	return <>{children}</>;
}
