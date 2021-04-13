exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("user", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("username").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
