exports.seed = async function(knex) {
  const relations = [];
  await knex("source_material_product").del();
  const productids = await knex.table("product").pluck("id");
  const source_materials_ids = await knex.table("source_material").pluck("id");

  productids.forEach(product => {
    source_materials_ids.forEach((source_material, i) => {
      relations.push({
        quantity: i + 2,
        productid: product,
        source_material_id: source_material
      });
    });
  });
  return knex("source_material_product").insert(relations);
};
