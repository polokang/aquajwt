var Sequelize = require("sequelize");

const { DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD, DB_USER, dialect, pool } = process.env;

// exports.connectToPG = () => {
//   const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     port: DB_PORT,
//     dialect: dialect,

//     pool: {
//       max: pool.max,
//       min: pool.min,
//       acquire: pool.acquire,
//       idle: pool.idle,
//     },
//   });

//   sequelize.sync({
//     force: false,
//   });

//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log("数据库连接成功...");
//     })
//     .catch((err) => {
//       console.error("数据库连接失败...", err);
//     });

//   return sequelize;
// };

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: dialect,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功...");
  })
  .catch((err) => {
    console.error("数据库连接失败...", err);
  });

module.exports = sequelize;
