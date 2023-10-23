const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.json({
        status: "fail",
        message: "Incorrect username or password!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "fail",
        message: "Incorrect username or password!",
      });
    }

    delete user.password;
    return res.json({ status: "success", user });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.avatarImage = req.body.image;
    user.isAvatarImageSet = true;
    await user.save();
    res.json({ status: "success", user, isSet: true });
  } catch (err) {
    res.json({ status: "error", error: err, isSet: false });
  }
};
