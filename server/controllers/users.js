const User = require("../models/user");
const JWT = require("jsonwebtoken");

const { JWT_SECRET } = require("../configuration");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "tecdreams",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    console.log("User controller SignUP() called", req.body);

    const { email, password } = req.body; // ou rea.value.body on POSTman
    // Check for  a user with the same email
    // const foundUser = await User.findOne({ email });
    const foundUser = await User.findOne({
      "local.email": email,
    });

    if (foundUser) {
      return res.status(403).json({
        error: "Email is already in use",
      });
    }

    // Create a new user
    // const newUser = new User({ email, password });
    // Create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });
    await newUser.save();

    // Respond with token
    // res.json({ user: 'created' });
    // Generate the token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    console.log("User controller SignIn() called", req.body);

    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("I managed to get here!");
    res.json({ secret: "Now You can see me !" });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
