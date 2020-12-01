export default () => ({
  server: {
    scheme: process.env.SCHEME,
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
  },
  database: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expirationTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
    }
  }
})