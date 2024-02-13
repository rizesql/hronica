import { json, type MetaFunction } from "@remix-run/node";

import { seo } from "~/lib/seo";
import { ErrorBoundary } from "~/root";

export const meta: MetaFunction = () => seo({ title: "404" });

export function loader() {
	throw json({}, { status: 404 });
}

export default function NotFound() {
	return <ErrorBoundary />;
}
