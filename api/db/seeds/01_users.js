exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert([
        { email: "Juancin", password: "239" },
        { username: "Pelado 10", password: "239" },
        { username: "Roberto", password: "239" }
      ]);
    });
};
