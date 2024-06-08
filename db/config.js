const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
    /*     dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    }, */
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        //require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
