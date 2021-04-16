exports.seed = async function(knex) {
  const relations = [];
  await knex("kit_product").del();
  const productids = await knex.table("product").pluck("id");
  const kitsids = await knex.table("kit").pluck("id");
  productids.forEach(product => {
    kitsids.forEach((kit, i) => {
      relations.push({
        quantity: i + 1,
        productid: product,
        kitid: kit
      });
    });
  });
  return knex("kit_product").insert(relations);
};
