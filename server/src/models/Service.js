import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceType: {
        type: String,
        enum: ['User', 'Carrier', 'Mechanic', 'Towing'],
        required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: false },
    companyAddress: { type: String, required: false },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;