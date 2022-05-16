export default {
  port: 1337,
  origin: 'http://localhost:3000',
  dbUri: "mongodb+srv://tutorial-admin:admin123456@cluster0.2reum.mongodb.net/rest-api-tutorial?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "3h",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
};
