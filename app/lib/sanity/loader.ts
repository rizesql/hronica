import { type QueryParams, createQueryStore } from "@sanity/react-loader";

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
