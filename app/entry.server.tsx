import { PassThrough } from "stream";

import {
	createCookie,
	createReadableStreamFromReadable,
	type HandleDocumentRequestFunction,
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { cacheHeader } from "pretty-cache-header";
import ReactDOM from "react-dom/server";

import { makeTiming } from "./lib/timings.server";

const ABORT_DELAY = 5000;

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>;

const versionCookie = createCookie("version", {
	path: "/",
	secure: import.meta.env.PROD,
	httpOnly: true, // only for server-side usage
	maxAge: 60 * 60 * 24 * 365, // keep the cookie for a year
});

export default async function handleRequest(...args: DocRequestArgs) {
	const [request, responseStatusCode, responseHeaders, remixContext] = args;
	responseHeaders.set("fly-region", process.env.FLY_REGION ?? "unknown");
	responseHeaders.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");

	const { version } = remixContext.manifest;

	if (!responseHeaders.has("cache-control")) {
		responseHeaders.append(
			"cache-control",
			cacheHeader({
				public: true,
				// @ts-expect-error it must be public
				private: false,
				maxAge: "60s", // cache time
				staleWhileRevalidate: "1y", // enables ISR
				staleIfError: "1y", // enables ISR
			}),
		);
	}

	responseHeaders.append("Vary", "Cookie");
	responseHeaders.append("Set-Cookie", await versionCookie.serialize(version));

	const callbackName = isbot(request.headers.get("user-agent"))
		? "onAllReady"
		: "onShellReady";

	return new Promise((resolve, reject) => {
		let didError = false;
		const { timings } = makeTiming("render", "renderToPipeableStream");

		const { pipe, abort } = ReactDOM.renderToPipeableStream(
			<RemixServer context={remixContext} url={request.url} />,
			{
				[callbackName]: () => {
					const body = new PassThrough();
					responseHeaders.set("Content-Type", "text/html");
					// eslint-disable-next-line @typescript-eslint/no-base-to-string
					responseHeaders.append("Server-Timing", timings.toString());
					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					);
					pipe(body);
				},
				onShellError: (err: unknown) => {
					reject(err);
				},
				onError: (error: unknown) => {
					didError = true;

					console.error(error);
				},
			},
		);

		setTimeout(abort, ABORT_DELAY);
	});
}

export function handleDataRequest(response: Response) {
	response.headers.set("fly-region", process.env.FLY_REGION ?? "unknown");
	response.headers.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");

	return response;
}
