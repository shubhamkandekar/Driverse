import express from 'express';
import createUserRequest from '../../controllers/Requests/UserMechRequest.js';
import createUserTowRequest from '../../controllers/Requests/UserTowRequest.js';
import multer from 'multer';
const router = express.Router();

// POST Request To Take the Service
// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Request To Take the Service
router.post('/userMechRequest', upload.array('images', 10), createUserRequest);
router.post('/userTowRequest', upload.array('images', 10), createUserTowRequest);

export default router;