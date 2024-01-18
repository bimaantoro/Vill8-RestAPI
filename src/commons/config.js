require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  },
  jwtToken: {
    accessToken: {
      key: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_AGE ?? 3600,
    },
    refreshToken: {
      key: process.env.REFRESH_TOKEN_KEY,
    },
  },
};

module.exports = config;
