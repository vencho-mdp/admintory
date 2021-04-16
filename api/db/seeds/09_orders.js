exports.seed = async function(knex) {
  const orders = [];
  await knex("order").del();
  const customerids = await knex.table("customer").pluck("id");
  const usersids = await knex.table("user").pluck("id");
  usersids.forEach(user => {
    customerids.forEach((customer, i) => {
      orders.push({
        delivery_date: new Date(),
        importance: "Alta",
        price: 390,
        customerid: customer,
        userid: user
      });
    });
  });
  return knex("order").insert(orders);
};
