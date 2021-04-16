exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("supplier", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("full_name").notNullable();
      table.string("city").notNullable();
      table.string("address").notNullable();
      table.string("company").notNullable();
      table.string("phone_number", 15).notNullable();
      table
        .uuid("userid")
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("supplier");
};
