exports.seed = async function(knex) {
  const relations = [];
  await knex("order_item").del();
  const productsids = await knex.table("product").pluck("id");
  const kitsids = await knex.table("kit").pluck("id");
  let orderids = await knex.table("order").pluck("id");
  orderids = orderids.slice(0, 2);
  orderids.forEach((order, i) => {
    relations.push({
      orderid: order,
      itemid: i > 1 ? kitsids[i] : productsids[i],
      quantity: i + 1,
      iskit: false
    });
  });
  return knex("order_item").insert(relations);
};
