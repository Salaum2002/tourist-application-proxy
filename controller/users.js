import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/users.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .send({ msg: "User with this email does not exist." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send({ msg: "Incorrect password." });
  }

  res.json({ access: true, user: { id: user._id, username: user.username } });
};

const getUser = async (req, res) => {
  const getAllUsers = await User.find().sort({ _id: -1 });
  res.json(getAllUsers);
};

const signup = async (req, res) => {
  const { username, email, phone, address, password } = req.body;

  const existingUser = await User.findOne({ email, username });
  if (existingUser) {
    return res
      .status(400)
      .json({ msg: "User with the same username or email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  let addUser = new User({
    username: username,
    email: email,
    phone: phone,
    address: address,
    password: hashedPassword,
  });

  addUser
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log("Signup: ", err));
};

export { getUser, signup, login };
