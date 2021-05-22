// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "admintory",
      user: process.env.USER,
      password: "root",
      host: 'pgdb'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
