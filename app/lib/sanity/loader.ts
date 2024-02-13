import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { createQueryStore, type QueryParams } from "@sanity/react-loader";

import { type Prettify } from "../types";

import { sanityConfig } from "~/lib/sanity/config";

const store = createQueryStore({ client: false, ssr: true });

export const useLiveMode = store.useLiveMode;

export const useQuery = <
	QueryResponseResult extends { data: unknown } = { data: unknown },
	QueryResponseError = unknown,
>(props: {
	query: string;
	params: { url: string } & (QueryParams | undefined);
	initial?: QueryResponseResult | undefined;
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { url, ...params } = props.params;

	const { data, ...state } = store.useQuery<
		QueryResponseResult["data"],
		QueryResponseError
	>(props.query, params, {
		// @ts-expect-error the boys at sanity didn't care that much about typings
		initial: props.initial,
	});

	return { data: data!, ...state };
};

export type Query<T> = Prettify<{
	initial: { data: T };
	params: { url: string } & (QueryParams | undefined);
	query: string;
}>;

export const image = (asset: { _ref: string }) => urlBuilder(sanityConfig).image(asset);

const LARGEST_VIEWPORT = 1920; // Retina sizes will take care of 4k (2560px) and other huge screens

const DEFAULT_MIN_STEP = 0.1; // 10%
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1000, 1150]; // arbitrary
// Based on statcounter's most common screen sizes: https://gs.statcounter.com/screen-resolution-stats
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

export function getImageProps({
	asset,
	maxWidth: userMaxWidth,
	minimumWidthStep = DEFAULT_MIN_STEP,
	customWidthSteps,
	sizes,
}: {
	asset: { _ref: string };
	minimumWidthStep?: number;
	customWidthSteps?: number[];
	maxWidth?: string | number;
	sizes?: string;
}) {
	if (!asset._ref) {
		return {};
	}
	const maxWidth = typeof userMaxWidth === "number" ? userMaxWidth : LARGEST_VIEWPORT;

	const builder = urlBuilder(sanityConfig).image(asset).fit("max").auto("format");

	const imageDimensions = getImageDimensions(asset);

	const baseSizes = [
		LARGEST_VIEWPORT,
		...(customWidthSteps ??
			(typeof userMaxWidth === "number"
				? DEFAULT_WIDTH_STEPS
				: DEFAULT_FULL_WIDTH_STEPS)),
	];
	const retinaSizes = Array.from(
		new Set([
			...baseSizes,
			...baseSizes.map((size) => size * 2),
			...baseSizes.map((size) => size * 3),
		]),
	)
		.sort((a, b) => a - b) // Lowest to highest
		.filter(
			(size) =>
				// Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
				// than the image are included to ensure we always get closest to the highest
				// quality for an image. Sanity's CDN won't scale the image above its limits.
				size <= imageDimensions.width * 1.1 &&
				// Exclude those larger than maxWidth's retina (x3)
				size <= maxWidth * 3,
		)
		// Exclude those with a value difference to their following size smaller than `minimumWidthStep`
		// This ensures we don't have too many srcSet variations, polluting the HTML
		.filter((size, i, arr) => {
			const nextSize = arr[i + 1];
			if (nextSize) {
				return nextSize / size > minimumWidthStep + 1;
			}

			return true;
		});

	return {
		src: builder.width(maxWidth).url(),

		srcSet: retinaSizes.map((size) => `${builder.width(size).url()} ${size}w`).join(", "),
		sizes: sizes ?? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
	};
}
