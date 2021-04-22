const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async createUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const encryptedPassword = await bcrypt.hash(password, 9);
      const encryptedEmail = await bcrypt.hash(email, 9);
      const [id] = await db("user")
        .insert({
          email: encryptedEmail,
          password: encryptedPassword,
          username
        })
        .returning("id");
      res.status(201).json(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went Wrong" });
    }
  }
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const correct_password = await db("user")
        .where({
          email
        })
        .select("password");
      const isPasswordOk = await bcrypt.compare(
        password,
        correct_password[0].password
      );
      console.log(isPasswordOk);
      if (!isPasswordOk) {
        res.status(401).json({ message: "Invalid Password" });
        return;
      }
      const accessToken = jwt.sign(
        { email, password },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(201).json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went Wrong" });
    }
  }
}
module.exports = new UserController();
