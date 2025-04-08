import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 })
    }

    // Create a test SMTP service account
    // For production, use your actual email service
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com", // replace with your email
        pass: process.env.EMAIL_PASSWORD || "your-password", // replace with your password or app password
      },
    })

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"LockYoLinks" <noreply@lockyolinks.com>',
      to: email,
      subject: "Verify Your Email for LockYoLinks",
      text: `Your verification code is: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #6d28d9; text-align: center;">LockYoLinks Email Verification</h2>
          <p>Thank you for signing up for LockYoLinks! Please use the following code to verify your email address:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 24px; margin: 0; color: #374151;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">© ${new Date().getFullYear()} LockYoLinks. All rights reserved.</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Verification code sent successfully" })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
  }
}

