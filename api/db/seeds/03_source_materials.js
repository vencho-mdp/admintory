exports.seed = async function(knex) {
  const source_materials = [];
  await knex("source_material").del();
  const uuids = await knex.table("user").pluck("id");
  const suppliersid = await knex.table("supplier").pluck("id");
  suppliersid.forEach((el, i) => {
    source_materials.push({
      supplierid: el,
      color: "Rojo",
      quality: "High",
      type: "Lienzo",
      cost: 300,
      name: "Lienzo Nuevo",
      measurement_unit: "Metro",
      userid: uuids[i]
    });
  });
  return knex("source_material").insert(source_materials);
};
