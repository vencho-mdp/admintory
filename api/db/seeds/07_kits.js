exports.seed = async function(knex) {
  const kits = [];
  await knex("kit").del();
  const uuids = await knex.table("user").pluck("id");
  uuids.forEach(el => {
    kits.push({
      name: "Kit Materno Barato",
      userid: el
    });
  });
  return knex("kit").insert(kits);
};
