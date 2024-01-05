const httpsOnly = async (c, next) => {
  const proto = c.req.header("X-Forwarded-Proto");
  const host = c.req.header("X-Forwarded-Host") ?? c.req.header("host") ?? "";
  if (proto === "http") {
    c.res.headers.set("X-Forwarded-Proto", "https");
    c.redirect(`https://${host}${c.req.path}`);
    return;
  }
  return await next();
};
export {
  httpsOnly
};
//# sourceMappingURL=https-only.js.map
