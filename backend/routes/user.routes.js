import express from 'express';
import User from '../models/user.model.js';
import { getAllUsers } from '../controllers/user.controller.js';

const router=express.Router();



// GET all users
// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find(); // fetch all users from MongoDB
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// ✅ Get total user count for admin dashboard
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;