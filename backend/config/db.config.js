module.exports = {
    HOST: process.env.HOST,
    DB_HOST: process.env.DB_HOST,
    CLIENT_PORT: process.env.CLIENT_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DIALECT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

};
