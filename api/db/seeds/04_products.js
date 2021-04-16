exports.seed = async function(knex) {
  const products = [];
  await knex("product").del();
  const uuids = await knex.table("user").pluck("id");
  uuids.forEach((el, i) => {
    products.push({
      color: "Rojo",
      quality: "High",
      type: "Bolso",
      profit_margin: 300,
      size: "Grande",
      name: "Bolso",
      userid: uuids[i]
    });
  });
  return knex("product").insert(products);
};
