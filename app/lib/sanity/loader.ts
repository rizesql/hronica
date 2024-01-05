import { createQueryStore } from "@sanity/react-loader";

export const { useQuery, useLiveMode } = createQueryStore({ client: false, ssr: true });
