const User = require('../models/User');

class UserController {
  async createUser(req, res) {
    try {
      const { username, email, age } = req.body;
      const newUser = new User({ username, email, age });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
