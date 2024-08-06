import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    companyAddress: {
      type: String,
      required: false,
    },
    serviceType: {
      type: String,
      enum: ["Driver", "Mechanic", "Tower","Agent","Company"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    refreshTokens: [
      { type: mongoose.Schema.Types.ObjectId, ref: "RefreshToken" },
    ],
  },
  { timestamps: true }
);

// Compound index for login 
userSchema.index({ email: 1, phone: 1 });

// Compound index 
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

// Hash the password 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
