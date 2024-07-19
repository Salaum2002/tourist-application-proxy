import bcrypt from "bcryptjs";
import User from "../models/users.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ msg: "User with this email does not exist." });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ msg: "Incorrect password." });
  }

  // Respond with user details including additional fields
  res.json({ 
    access: true, 
    user: { 
      id: user._id, 
      username: user.username, 
      email: user.email, 
      phone: user.phone, 
      address: user.address 
    } 
  });
};

const getUser = async (req, res) => {
  const getAllUsers = await User.find().sort({ _id: -1 });
  res.json(getAllUsers);
};

const signup = async (req, res) => {
  const { username, email, phone, address, password } = req.body;

  const existingEmail = await User.findOne({ email });
  const existingUser = await User.findOne({ username });
  if (existingUser || existingEmail) {
    return res.status(400).json({ msg: "User with the same username or email already exists." });
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
