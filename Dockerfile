FROM node:22.3.0-alpine3.19

RUN npm install -g pnpm

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /src
COPY --chown=app:app package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
COPY --chown=app:app . .

ENV NEXT_PUBLIC_BASE_URL = http://localhost:8080 \
    NEXT_PUBLIC_BASE_API_URL = http://localhost:8080/api
EXPOSE 3000

CMD [ "pnpm", "dev" ]