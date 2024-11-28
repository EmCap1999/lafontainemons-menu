module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  SCHEMA: process.env.SCHEMA,
  DIALECT: process.env.DIALECT,
  PROTOCOL: "postgres",
  SSL_PROTECTED: process.env.SSL_PROTECTED,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
