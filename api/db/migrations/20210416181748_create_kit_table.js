exports.up = function(knex) {
  return knex.schema.createTable("kit", table => {
    table
      .uuid("id")
      .primary()
      .notNullable()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name").notNullable();
    table
      .uuid("userid")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("kit");
};
