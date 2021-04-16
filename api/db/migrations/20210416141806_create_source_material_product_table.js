exports.up = function(knex) {
  return knex.schema.createTable("source_material_product", table => {
    table
      .uuid("source_material_id")
      .notNullable()
      .references("id")
      .inTable("source_material")
      .onDelete("CASCADE");
    table
      .uuid("productid")
      .notNullable()
      .references("id")
      .inTable("product")
      .onDelete("CASCADE");
    table.specificType("quantity", "smallint").notNullable();
    table.primary(["source_material_id", "productid"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("source_material_product");
};
