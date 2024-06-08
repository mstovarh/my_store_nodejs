const { Pool } = require('pg');
const { config } = require('./../config/config');

options = {
  connectionString: config.dbUrl,
};

if (config.isProd) {
  //options.connectionString = config.dbUrl;
  options.ssl = { rejectUnauthorized: false };
} /* else {
  const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
} */

const pool = new Pool(options);
module.exports = pool;
