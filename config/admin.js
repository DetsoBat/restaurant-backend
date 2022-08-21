module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', "asdasdasd"),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', "asdasd"),
  },
});
