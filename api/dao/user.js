const db = require("../db/db");

class UserDAO {
  async createUser(email, password) {
    const [id] = await db("user")
      .insert({
        email,
        password
      })
      .returning("id");
    return id;
  }
}

module.exports = new UserDAO();
