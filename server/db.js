const {Sequelize} = require('sequelize')

module.exports =  new Sequelize(
    process.env.DB_NAME, // нАЗВАНИЕ БД
    process.env.DB_USER, // ПОЛЬЗОВАТЕЛЬ
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)