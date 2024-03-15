import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize =
  process.env.NODE_ENV === 'development'
    ? new Sequelize(
        process.env.DB_V2,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: process.env.DB_DIALECT
        }
      )
    : new Sequelize(process.env.DB_URI, {
        dialect: 'postgres',
        logging: console.log
      })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database')
  })

export default sequelize
