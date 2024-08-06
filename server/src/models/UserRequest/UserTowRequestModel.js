import mongoose from "mongoose";

const truckDetailsSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const trailerDetailsSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const userTowRequestSchema = new mongoose.Schema(
  {
    user_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    serviceType: {
      type: String,
      required: true,
    },
    problemDescription: {
      type: String,
      required: true,
    },
    images: [{ type: String,  default: [] }],
    vehicleType: {
      type: String,
      enum: ["Truck", "Trailer"],
      required: true,
    },
    truckDetails: truckDetailsSchema,
    trailerDetails: trailerDetailsSchema,
    radius: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserTowRequest = mongoose.model("UserTowRequest", userTowRequestSchema);
export default UserTowRequest;
