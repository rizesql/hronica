import { secureHeaders as _secureHeaders } from "hono/secure-headers";
const secureHeaders = async (c, next) => {
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
      upgradeInsecureRequests: []
    }
  })(c, next);
};
export {
  secureHeaders
};
//# sourceMappingURL=secure-headers.js.map
