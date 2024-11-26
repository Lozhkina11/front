module.exports = {
  development: { 
    username: 'admin', //process.env.DB_USER,
    password:'123',           // process.env.DB_PASS,
    database:"photoshare", //process.env.DB_NAME,
    host: process.env.DB_HOST, //
    dialect: process.env.DB_DIALECT || 'postgres',
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
