exports.up = function(knex) {
  return knex.schema.createTable("order_item", table => {
    table
      .uuid("orderid")
      .notNullable()
      .references("id")
      .inTable("order")
      .onDelete("CASCADE");
    table.uuid("itemid").notNullable();
    table.string("iskit").notNullable();
    table.specificType("quantity", "smallint").notNullable();
    table.primary(["orderid", "itemid"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("order_item");
};
