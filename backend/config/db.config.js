module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  SCHEMA: process.env.SCHEMA,
  DIALECT: "postgres",
  PROTOCOL: "postgres",
  SSL_PROTECTED: process.env.SSL_PROTECTED,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
