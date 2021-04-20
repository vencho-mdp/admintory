const db = require("../db/db");
const bcrypt = require("bcrypt");

class UserController {
  async createUser(req, res) {
    const { email, password } = req.body;
    try {
      const encryptedPassword = await bcrypt.hash(password, 9);
      const encryptedEmail = await bcrypt.hash(email, 9);
      const [id] = await db("user")
        .insert({
          email: encryptedEmail,
          password: encryptedPassword
        })
        .returning("id");

      res.status(201).json(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went Wrong" });
    }
  }
}
module.exports = new UserController();
