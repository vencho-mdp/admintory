exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert([
        { username: "Juancin" },
        { username: "Pelado 10" },
        { username: "Roberto" }
      ]);
    });
};
