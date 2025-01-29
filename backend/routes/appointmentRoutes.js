import express from "express";
import { bookAppointment } from "../controllers/appointmentsController.js";

const router = express.Router();

// 📌 Randevu oluşturma endpoint'i
router.post("/book", bookAppointment);

export default router;
