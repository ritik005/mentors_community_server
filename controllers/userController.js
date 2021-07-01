require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordValid) return res.status(404).json({ message: "Invalid credential" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });

  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
}

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser) return res.status(404).json({message: "User already exist"});

    if(password !== confirmPassword) return res.status(400).json({message: "Password doesnot match"});

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({name, email, password: hashedPassword});

    const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" });

    res.status(200).json({ result, token });

  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
 
}

module.exports = {signin, signup};