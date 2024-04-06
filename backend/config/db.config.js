module.exports = {
    HOST: process.env.HOST,
    SERVER_PORT: process.env.SERVER_PORT,
    USER: process.env.USER,
    PASSWORD: process.env.PASS,
    DB: process.env.DB,
    dialect: process.env.DIALECT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

};
