import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) return res.status(400).json({ message: "This field cannot be blank" });

  const query = "SELECT * FROM users WHERE user_id = ?";
  db.query(query, [userId], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) return res.status(401).json({ message: "Invalid user data" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid user data" });

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
};