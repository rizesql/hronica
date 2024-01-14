import urlBuilder from "@sanity/image-url";
import { type QueryParams, createQueryStore } from "@sanity/react-loader";
import sanityConfig from "sanity.config";

import { type Prettify } from "../types";

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

	return { data: data as QueryResponseResult["data"], ...state };
};

export type Query<T> = Prettify<{
	initial: { data: T };
	params: { url: string } & (QueryParams | undefined);
	query: string;
}>;

export const image = (asset: { _ref: string }) => urlBuilder(sanityConfig).image(asset);
