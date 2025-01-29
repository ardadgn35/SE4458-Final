import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

// 📌 MongoDB Bağlantısı
connectDB();

const app = express();
app.use(express.json());

// 📌 CORS Ayarları (Tarayıcıdan gelen isteklerin engellenmesini önler)
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL'in
  credentials: true, // Çerezleri destekler
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// 📌 Rotalar
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
