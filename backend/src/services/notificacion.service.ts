// notificacion.service.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotificationEmail(
  to: string,
  subject: string,
  text: string,
  html?: string // 📧 nuevo: html opcional
) {
  const mailOptions = {
    from: `Verificación <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html, // 📧 opcional
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado a: ${to}`);
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
}
