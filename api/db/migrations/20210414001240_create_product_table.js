exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("product", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("color").notNullable();
      table.string("size").notNullable();
      table.string("type").notNullable();
      table.string("name").notNullable();
      table.decimal("profit_margin").notNullable();
      table.string("quality", 15).notNullable();
      table
        .uuid("userid")
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("product");
};
