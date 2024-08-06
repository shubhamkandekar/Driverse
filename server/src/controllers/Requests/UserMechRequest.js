import UserRequest from "../../models/UserRequest/UsermechRequestModel.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createUserRequest = async (req, res) => {
  const {
    user_id,
    serviceType,
    problemDescription,
    vehicleType,
    truckDetails,
    trailerDetails,
    radius,
    address,
  } = req.body;

    try {
      // Process images if provided
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
  
        for (const file of req.files) {
          const filePath = path.join(uploadDir, file.originalname);
          await sharp(file.buffer)
            .resize(800) 
            .jpeg({ quality: 80 }) 
            .toFile(filePath);
          imagePaths.push(`/uploads/${file.originalname}`);
        }
      }

    // Create new user request object
    const newUserRequest = new UserRequest({
      user_id,
      serviceType,
      problemDescription,
      vehicleType,
      truckDetails: vehicleType === "Truck" ? truckDetails : undefined,
      trailerDetails: vehicleType === "Trailer" ? trailerDetails : undefined,
      radius,
      address,
      images: imagePaths, 
    });

    await newUserRequest.save();

    res.status(201).json(newUserRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createUserRequest;
