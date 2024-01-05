FROM oven/bun AS build
WORKDIR /app

COPY . .

RUN bun i --ignore-scripts
RUN bun run build

FROM oven/bun:slim AS final

COPY --from=build /app/server server
COPY --from=build /app/index.ts index.ts
COPY --from=build /app/build build
COPY --from=build /app/assets assets
COPY --from=build /app/public public

ENV NODE_ENV=production

EXPOSE 3000
CMD ["bun", "index.ts"] 
