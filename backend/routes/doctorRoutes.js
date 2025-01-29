const express = require('express');
const Doctor = require('../models/Doctor');
const multer = require('multer');

const router = express.Router();

// 📌 1️⃣ Multer ile Resim Yükleme Ayarları
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 📌 2️⃣ Doktor Kaydı (Pending olarak eklenir)
router.post('/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { fullname, specialty, address, city, workingHours, email } = req.body;

        if (!fullname || !specialty || !address || !city || !workingHours || !email) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newDoctor = new Doctor({
            fullname,
            specialty,
            address,
            city, // ✅ Yeni: Şehir bilgisi
            workingHours,
            email,
            profileImage: req.file ? req.file.buffer.toString('base64') : null,
            status: 'pending'
        });

        await newDoctor.save();
        res.status(201).json({ success: true, message: 'Registration successful. Waiting for admin approval.' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 📌 3️⃣ Bekleyen Doktorları Listeleme (Admin Paneli İçin)
router.get('/pending-doctors', async (req, res) => {
    try {
        const pendingDoctors = await Doctor.find({ status: 'pending' });
        res.json(pendingDoctors);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 📌 4️⃣ Doktor Onaylama (Admin Panelinden)
router.post('/approve-doctor/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        doctor.status = 'approved';
        await doctor.save();

        res.json({ success: true, message: 'Doctor approved successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 📌 5️⃣ Onaylanmış Doktorları Listeleme (Search Doctor Sayfası İçin)
router.get('/approved-doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'approved' });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 📌 Belirli bir doktoru ID'ye göre getir
router.get('/doctor/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
