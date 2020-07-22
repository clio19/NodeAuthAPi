const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: "Please enter your email",
      trim: true,
      lowercase: true,
      // validate: [
      //   { validator: (value) => isEmail(value), msg: "Invalid email." },
      // ],
    },
    password: {
      type: String,
      // required: true,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

userSchema.pre("save", async function (next) {
  try {
    console.log("entered");
    if (this.method !== "local") {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    // const passwordHash = await bcrypt.hash(this.password, salt);
    // this.password = passwordHash;
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    console.log("exited");

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
