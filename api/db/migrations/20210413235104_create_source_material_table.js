exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('source_material', (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('supplierid')
        .notNullable()
        .references('id')
        .inTable('supplier')
        .onDelete('CASCADE');
      table.string('color').notNullable();
      table.string('quality').notNullable();
      table.string('material').notNullable();
      table.decimal('cost').notNullable();
      table.string('measurement_unit', 15).notNullable();
      table
        .uuid('userid')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('source_material');
};
