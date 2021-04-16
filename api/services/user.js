const userDAO = require("../dao/user");

class UserService {
  async createUser({ email, password }) {
    //bcrypt stuff
    const user = await userDAO.createUser(email, password);
    return user;
  }
}
module.exports = new UserService();
