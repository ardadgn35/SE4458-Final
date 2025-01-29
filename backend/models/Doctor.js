const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    specialty: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true }, // ✅ Yeni: Şehir bilgisi eklendi
    workingHours: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    status: { type: String, default: 'pending' }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
