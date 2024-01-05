import { createId } from "@paralleldrive/cuid2";
import { MiddlewareHandler } from "hono";

export const setNonce: MiddlewareHandler<{ Variables: { nonce: string } }> = async (
	c,
	next,
) => {
	c.set("nonce", createId());
	return await next();
};
