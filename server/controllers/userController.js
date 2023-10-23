const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  console.log("register");
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ status: "fail", message: "Username is already used." });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        status: "fail",
        message: "This email is already used.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: "success", user });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};
