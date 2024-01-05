import { type MiddlewareHandler } from "hono";
import { secureHeaders as _secureHeaders } from "hono/secure-headers";

export const secureHeaders: MiddlewareHandler = async (c, next) => {
	const nonce = `'nonce-${c.var.nonce}'`;

	return _secureHeaders({
		referrerPolicy: "same-origin",
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			// connectSrc: ["self", process.env.NODE_ENV === "development" ? "ws:" : null].filter(
			// 	Boolean,
			// ) as string[],
			fontSrc: ["self"],
			// frameSrc: ["self"],
			scriptSrcAttr: [nonce],
			upgradeInsecureRequests: [],
		},
	})(c, next);
};
