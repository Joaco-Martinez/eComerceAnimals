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

export async function sendResetCodeEmail(email: string, code: string) {
  const mailOptions = {
    from: `"Punky Pet" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Código para restablecer tu contraseña',
    text: `Tu código de recuperación es: ${code}`,
    html: `<p>Tu código de recuperación es: <b>${code}</b></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código de recuperación enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar código:', error);
    throw error;
  }
}

export async function sendNotificationEmail(
  to: string,
  subject: string,
  text: string,
  html?: string 
) {
  const mailOptions = {
    from: `Punky Pet <${process.env.SMTP_USER}>`,
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
