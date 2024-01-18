import { PassThrough } from "stream";

import {
	type HandleDocumentRequestFunction,
	createReadableStreamFromReadable,
	createCookie,
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { cacheHeader } from "pretty-cache-header";
import ReactDOM from "react-dom/server.node";

import { NonceContext } from "./lib/nonce";
import { makeTimings } from "./lib/timings.server";

const ABORT_DELAY = 5000;

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>;

const versionCookie = createCookie("version", {
	path: "/",
	secure: import.meta.env.PROD,
	httpOnly: true, // only for server-side usage
	maxAge: 60 * 60 * 24 * 365, // keep the cookie for a year
});

export default async function handleRequest(...args: DocRequestArgs) {
	const [request, responseStatusCode, responseHeaders, remixContext, loadContext] = args;
	responseHeaders.set("fly-region", process.env.FLY_REGION ?? "unknown");
	responseHeaders.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");

	const { version } = remixContext.manifest;

	if (!responseHeaders.has("cache-control")) {
		responseHeaders.append(
			"cache-control",
			cacheHeader({
				public: true,
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

	// prettier-ignore
	const nonce = "";
	// process.env.NODE_ENV === "production" ?
	// // @ts-expect-error the value is there 100%
	// loadContext._var.nonce as string :
	// "";

	return new Promise((resolve, reject) => {
		let didError = false;
		const timings = makeTimings("render", "renderToPipeableStream");

		const { pipe, abort } = ReactDOM.renderToPipeableStream(
			<NonceContext.Provider value={nonce}>
				<RemixServer context={remixContext} url={request.url} />
			</NonceContext.Provider>,
			{
				[callbackName]: () => {
					const body = new PassThrough();
					responseHeaders.set("Content-Type", "text/html");
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
				nonce,
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
