exports.seed = async function(knex) {
  const customers = [];
  await knex("customer").del();
  const uuids = await knex.table("user").pluck("id");
  uuids.forEach(el => {
    customers.push({
      full_name: "Carlos Román",
      city: "San Francisco",
      address: "Manhattan 3999",
      phone_number: "(22)8482309284",
      company: "Macdonalds",
      userid: el
    });
  });
  return knex("customer").insert(customers);
};
