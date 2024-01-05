import { createId } from "@paralleldrive/cuid2";
const setNonce = async (c, next) => {
  c.set("nonce", createId());
  return await next();
};
export {
  setNonce
};
//# sourceMappingURL=nonce.js.map
