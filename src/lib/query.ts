import {
	useInfiniteQuery as useTanstackInfiniteQuery,
	type InfiniteData,
	type QueryKey,
	type DefaultError,
	type UseInfiniteQueryOptions,
	QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: Infinity,
			staleTime: Infinity,
		},
	},
});

export const useInfiniteQuery = <
	TQueryFnData,
	TError = DefaultError,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	options: UseInfiniteQueryOptions<
		TQueryFnData,
		TError,
		TData,
		TQueryFnData,
		TQueryKey,
		TPageParam
	>,
) => useTanstackInfiniteQuery(options, queryClient);
