import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 📌 Randevu oluşturma ve mail gönderme fonksiyonu
export const bookAppointment = async (req, res) => {
  const { patientName, patientEmail, date, time, doctorName } = req.body;

  // Eksik alanları kontrol et
  if (!patientName || !patientEmail || !date || !time || !doctorName) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    // SMTP ayarları
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const reviewLink = `http://localhost:5173/review`;

    // E-posta içeriği
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: patientEmail,
        subject: "Appointment Confirmation",
        html: `
          <h3>Appointment Confirmation</h3>
          <p>Dear ${patientName},</p>
          <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been successfully scheduled.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <br />
          <a href="${reviewLink}" 
             style="
               display: inline-block;
               padding: 10px 20px;
               color: #fff;
               background-color: #007bff;
               text-decoration: none;
               font-weight: bold;
               border-radius: 5px;
             ">Leave a Review</a>
          <p>Thank you for choosing our service!</p>
        `,
      };

    // Mail gönder
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Appointment booked and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to book appointment and send email." });
  }
};
