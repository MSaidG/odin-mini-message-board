const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
//   ssl: 'require',
// });

const pool = new Pool({
  connectionString: process.env.DB_URI,
});

module.exports = pool;