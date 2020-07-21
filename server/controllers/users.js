const User = require('../models/user');

module.exports = {
  signUp: async (req, res, next) => {
    console.log('User controller SignUP() called', req.body);

    const { email, password } = req.body; // ou rea.value.body on POSTman
    // Check for  a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Respond with token
    res.json({ user: 'created' });
  },
  signIn: async (req, res, next) => {
    console.log('User controller SignIn() called');
  },
  secret: async (req, res, next) => {
    console.log('User controller Secret() called');
  },
};
