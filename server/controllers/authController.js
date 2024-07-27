import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import ROLES_LIST from '../config/Roles_list.js';
import RefreshToken from '../models/RefreshToken.js';
import crypto from 'crypto';
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = async (userId) => {
    const token = crypto.randomBytes(40).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    await RefreshToken.create({ token: hashedToken, userId });
  
    // Optionally add token to the user document
    const user = await User.findById(userId);
    if (user) {
      user.refreshTokens.push(await RefreshToken.findOne({ token: hashedToken }));
      await user.save();
    }
  
    return token;
  };





export const registerUser = async (req, res) => {
    const { username, email, phone, companyAddress, serviceType, password } = req.body;
  
    try {
      // Check if user exists
      const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create user
      const user = await User.create({ 
        username, 
        email, 
        phone, 
        companyAddress, 
        serviceType, 
        password 
      });
  
      if (user) {
        const token = generateToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          companyAddress: user.companyAddress,
          serviceType: ROLES_LIST[serviceType],
          token,
          refreshToken
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//  Authenticate user & get token
//  POST /api/auth/login

export const authUser = async (req, res) => {
    const { email, phone, password } = req.body;
  
    try {
      const user = await User.findOne({ $or: [{ email }, { phone }] });
  
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          serviceType: ROLES_LIST[user.serviceType],
          token,
          refreshToken,
          message: "User logged in successfully",
        });
      } else {
        res.status(401).json({ message: "Invalid email/phone or password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const logoutUser = async (req, res) => {
    const { token } = req.body;
  
    try {
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }
  
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      
      // Remove the refresh token from the database
      const result = await RefreshToken.findOneAndDelete({ token: hashedToken });
      
      // Optionally remove the token reference from the user document
      if (result) {
        const user = await User.findById(result.userId);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(rt => !rt.equals(result._id));
          await user.save();
        }
      }
  
      if (!result) {
        return res.status(404).json({ message: "Token not found" });
      }
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };