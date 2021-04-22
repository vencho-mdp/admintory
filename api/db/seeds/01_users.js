exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert([
        { email: "juan@juan.com", username: "Juancin", password: "239" },
        { email: "peload@juan.com", username: "Pelado 10", password: "239" },
        { email: "robert@juan.com", username: "Roberto", password: "239" }
      ]);
    });
};
