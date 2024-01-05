import { MiddlewareHandler } from "hono";

export const removeTrailingSlash: MiddlewareHandler = async (c, next) => {
	if (c.req.path.endsWith("/") && c.req.path.length > 1) {
		const query = c.req.url.slice(c.req.path.length);
		const safepath = c.req.path.slice(0, -1).replace(/\/+/g, "/");

		return c.redirect(safepath + query, 301);
	}

	return await next();
};
