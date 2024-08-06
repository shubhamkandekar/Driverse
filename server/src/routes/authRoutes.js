import express from 'express';
import { registerUser, authUser,logoutUser, resetPassword, initiatePasswordReset, verifyOtp } from '../controllers/authController.js';
// import { validateUserSignup } from '../middlewares/auth/validators.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/initiate-password-reset', initiatePasswordReset);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;