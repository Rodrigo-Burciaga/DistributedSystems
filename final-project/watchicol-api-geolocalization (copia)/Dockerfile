FROM node:8.12.0 as build
WORKDIR /oauth-server
COPY . /oauth-server
RUN npm install
RUN ./node_modules/.bin/nps build.prod

FROM node:8.12.0-alpine
LABEL version="0.0.1"
LABEL description="OAuth Server for tokens authorization"
WORKDIR /oauth-server
COPY --from=build /oauth-server/dist /oauth-server
ENV DATABASE_CONNECTION_NAME "authorization-service"
ENV DATABASE_HOST "localhost"
ENV DATABASE_USER_NAME "sa"
ENV DATABASE_PASSWORD "G3neric!"
ENV DATABASE_NAME "authorization_service"
ENV DATABASE_LOGGING true
ENV DATABASE_SYNCHRONIZE false
ENV PORT 3000
ENV CORS_ALLOWED_ORIGIN "http://localhost:4200"
ENV KONG_ADMIN_URL "http://localhost:8001"
ENV KONG_API_URL_OAUTH2 "https://localhost:8443"
ENV ENDPOINT_VERIFY_CLIENT "/verifyClient/:client_id"
ENV ENDPOINT_GET_SIGN "/getSign"
ENV ENDPOINT_GRANTED_ACCESS_IMPLICIT_GRANT "/grantedAccessImplicitGrant"
ENV ENDPOINT_AUTH_USER "/auth_user"
ENV ENDPOINT_VERIFY_SIGN_ID "/verifySignId"
ENV ENDPOINT_VERIFY_JWT "/verifyJWT"
ENV ENDPOINT_OAUTHSERVER "/apiAuthServer"
ENV ENDPOINT_OAUTH_API_KONG "/oauth_api"
ENV ENDPOINT_KONG_AUTH "/oauth2/authorize"
ENV ENDPOINT_KONG_OAUTH2 "/oauth2"
ENV PROVISION_KEY "1sjdi390skaldo129s0ddjfl"
EXPOSE 3000
ENTRYPOINT ["node", "src/index.js"]
