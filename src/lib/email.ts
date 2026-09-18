import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'gnbmailsender@gmail.com',
    pass: process.env.EMAIL_PASS || 'akkjqlnhkgbudmxe',
  },
});

export const NOTIFICATION_RECIPIENT = 'groupditya@gmail.com';

/**
 * Send email notification for new consultation inquiry
 */
export async function sendInquiryNotification(inquiry: {
  name: string;
  phone: string;
  email: string;
  service?: string | null;
  message?: string | null;
  source?: string;
}) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #011633; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
          <h2 style="color: #ffffff; margin: 0;">New Consultation Inquiry</h2>
          <p style="color: #FF5722; margin: 5px 0 0 0; font-size: 14px;">Ditya Group Website Lead</p>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
          <p><strong>Source:</strong> ${inquiry.source || 'Website'}</p>
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
          ${inquiry.service ? `<p><strong>Service Interest:</strong> ${inquiry.service}</p>` : ''}
          ${inquiry.message ? `<div style="margin-top: 15px; padding: 12px; background-color: #f9f9f9; border-left: 4px solid #FF5722;"><p style="margin: 0; font-style: italic;">"${inquiry.message}"</p></div>` : ''}
        </div>
        <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Ditya Group • Automated Notification System
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Ditya Group Lead Portal" <${process.env.EMAIL_USER || 'gnbmailsender@gmail.com'}>`,
      to: NOTIFICATION_RECIPIENT,
      subject: `🚨 New Lead: ${inquiry.name} (${inquiry.source || 'Consultation'})`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending inquiry email notification:', error);
    return { success: false, error };
  }
}

/**
 * Send admin OTP password reset email
 */
export async function sendAdminResetOtpEmail(toEmail: string, otp: string) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #011633; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
          <h2 style="color: #ffffff; margin: 0;">Admin Security Verification</h2>
          <p style="color: #FF5722; margin: 5px 0 0 0; font-size: 14px;">Ditya Group Portal</p>
        </div>
        <div style="padding: 25px; text-align: center; background-color: #ffffff;">
          <p style="color: #555; font-size: 16px;">You requested a password reset for your Ditya Group administrator account.</p>
          <div style="margin: 25px 0; padding: 15px; background: #FFF3E0; border: 2px dashed #FF5722; border-radius: 8px; display: inline-block;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #011633;">${otp}</span>
          </div>
          <p style="color: #888; font-size: 13px;">This 6-digit code will expire in 10 minutes. If you did not request this, please disregard this email.</p>
        </div>
        <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 12px; color: #777;">
          Security Alert • Ditya Group
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Ditya Group Security" <${process.env.EMAIL_USER || 'gnbmailsender@gmail.com'}>`,
      to: toEmail,
      subject: `Your Admin Verification Code: ${otp}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error };
  }
}
