# oauth2-auth-server

authorization server for identity


## Getting Started

This section will help you to run the application on your host

### Prerequisites

You need to have installed  the following:

* [Kong API Gateway] (https://konghq.com/kong-community-edition/) - API for Gateway and Oauth2
* [OAuth2 Plugin] (https://docs.konghq.com/plugins/oauth2-authentication/) - Plugin for Oauth2
* [Node Environment]  (https://nodejs.org/en/download/) - Required to setup the Server
* IDE or Text Editor [WebStorm] (https://www.jetbrains.com/webstorm/) - WebStorm was used to develop
* Preferably [Postman] (https://www.getpostman.com/) - For testing RestFul Services

### Installing

#### Clone the Repository

Download all dependencies at root directory  where is located the file package.json, running the following command:

```
npm install
```

## Deployment

To deploy the application you just need to run the following command at root directory:

```
npm start

```

## Running Tests

Before testing the app make sure to change the properties file to match your configuration in the file
/src/util/constantsKongService.ts

To test the application we use Postman and the collection file to test the API, the collection file is under
the path /postman_requests; to import the file in postman see the documentation:
[importing Postman] (https://www.getpostman.com/docs/v6/postman/collections/data_formats).

We also include the collection file to test OAuth2 flows in the Kong API using Postman (please refer to the
specification [Oauth2] (https://tools.ietf.org/html/rfc6749)), at the path /kong_api_requests; import the collection
to Postman and test.

