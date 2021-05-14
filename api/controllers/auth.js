const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  async createUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const checkEmail = await db('user').where('email', email);
      if (checkEmail[0])
        return res.status(409).json({
          message: 'Email Taken'
        });
      const encryptedPassword = await bcrypt.hash(password, 9);
      await db('user').insert({
        email,
        password: encryptedPassword,
        username
      });
      res.status(201).json({
        message: 'User Created'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went Wrong' });
    }
  }
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const db_query = await db('user')
        .where({
          email
        })
        .select('password', 'id');

      const isPasswordOk = await bcrypt.compare(password, db_query[0].password);
      if (!isPasswordOk)
        return res.status(401).json({ message: 'Invalid Password' });

      const accessToken = jwt.sign(
        { id: db_query[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 60 * 24
        }
      );
      res.status(201).json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went Wrong' });
    }
  }
}
module.exports = new UserController();
