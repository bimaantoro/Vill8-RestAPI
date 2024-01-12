const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const config = require('./commons/config');
const ClientError = require('./exceptions/ClientError');
const plugins = require('./commons/plugins');

const init = async () => {
  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    debug: {
      request: ['error'],
    },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('vill8app_jwt', 'jwt', {
    keys: config.jwtToken.accessToken.key,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwtToken.accessToken.expiresIn,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register(plugins);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
