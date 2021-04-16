const { createUser } = require("../services/user");

class UserController {
  async createUser(req, res) {
    try {
      const id = await createUser(req.body);
      res.status(201).json(id);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new UserController();
