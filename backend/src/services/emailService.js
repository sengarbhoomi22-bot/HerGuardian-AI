import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true,
  });
};

export const sendPasswordResetEmail = async ({ to, resetUrl, name }) => {
  const transporter = createTransport();
  const fromName = process.env.FROM_NAME || 'HerGuardian AI';
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@herguardian.ai';

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #f5d0e8; border-radius: 16px; background: linear-gradient(135deg, #fff7fb, #ffffff);">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #d94688;">HerGuardian AI</h2>
        <p style="margin: 6px 0 0; color: #7a5a69;">Your personal wellbeing companion</p>
      </div>
      <h3 style="margin-bottom: 10px;">Hello ${name || 'there'},</h3>
      <p style="line-height: 1.6;">We received a request to reset your password for HerGuardian AI. Click the button below to create a new password.</p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${resetUrl}" style="background: linear-gradient(135deg, #ec4899, #d94688); color: white; text-decoration: none; padding: 12px 20px; border-radius: 999px; display: inline-block; font-weight: 600;">Reset Password</a>
      </div>
      <p style="font-size: 14px; color: #6b7280;">If the button does not work, copy and paste this link into your browser:</p>
      <p style="font-size: 13px; word-break: break-all; color: #4f46e5;">${resetUrl}</p>
      <p style="margin-top: 16px; font-size: 13px; color: #6b7280;">This link will expire in 15 minutes for your security.</p>
      <p style="font-size: 13px; color: #6b7280;">If you did not request this, you can safely ignore this email.</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject: 'Reset your HerGuardian AI password',
    html,
  });

  if (transporter.options?.streamTransport) {
    console.log('[Email] Password reset email prepared in development mode.');
    console.log(`[Email] Reset URL: ${resetUrl}`);
  }

  return info;
};
