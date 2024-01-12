const users = require('../api/users');
const UsersService = require('../services/UsersService');
const usersValidator = require('../validator/users');

const authentications = require('../api/authentications');
const AuthenticationsService = require('../services/AuthenticationsService');
const TokenManager = require('../tokenize/TokenManager');
const AuthenticationsValidator = require('../validator/authentications');

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();

const plugins = [
  {
    plugin: users,
    options: {
      usersService,
      validator: usersValidator,
    },
  },
  {

    plugin: authentications,
    options: {
      authenticationsService,
      usersService,
      tokenManager: TokenManager,
      validator: AuthenticationsValidator,
    },
  },
];

module.exports = plugins;
