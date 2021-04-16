exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("order", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("customerid")
        .notNullable()
        .references("id")
        .inTable("customer")
        .onDelete("CASCADE");
      table.timestamp("delivery_date");
      table.string("importance").notNullable();
      //calculate price when doing the query
      table.specificType("price", "smallint").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("status").defaultTo("Pendiente");
      table
        .uuid("userid")
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("order");
};
