exports.up = function(knex) {
  return knex.schema.createTable("kit_product", table => {
    table
      .uuid("kitid")
      .notNullable()
      .references("id")
      .inTable("kit")
      .onDelete("CASCADE");
    table
      .uuid("productid")
      .notNullable()
      .references("id")
      .inTable("product")
      .onDelete("CASCADE");
    table.specificType("quantity", "smallint").notNullable();
    table.primary(["kitid", "productid"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("kit_product");
};
