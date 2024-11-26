module.exports = {
  development: {
    username:"postgres",
    password: "081099",
    database: "photoshare",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
