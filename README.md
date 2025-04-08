# LockYoLinks

LockYoLinks is a secure, privacy-focused link-sharing platform that lets you stay in control of who accesses your shared URLs. With features like password protection, link expiration, invite-only access, and click tracking, it’s built for safe and flexible sharing.

---

## 🚀 Features

- 🔐 **Password Protection**: Secure links with custom passwords
- ⏱️ **Expiration Times**: Automatically expire links after a set time
- 📉 **Maximum Clicks**: Limit the number of times a link can be opened
- 📧 **Invite-Only Access**: Restrict access to specific email addresses
- 📊 **Click Tracking**: Monitor link activity and number of clicks
- 👤 **User Authentication**: Sign in via Email/Password or Google
- 📱 **Responsive Design**: Fully functional on mobile and desktop

---

## 💠 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Firebase Cloud Functions (optional)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Hosting**: Vercel (recommended) or Firebase Hosting

---

## 🔧 Setup Instructions

### 1. Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://console.firebase.google.com/)
2. Enable Firebase Authentication with **Email/Password** and **Google sign-in**
3. Create a Firestore database in **production mode**
4. Apply the Firestore security rules from `lib/firebase/firebase-rules.txt`
5. Set up your Firebase Credentials in the `.env` file in the root directory

---

### 2. Resend Setup

1. Create a Resend account at [resend.com/onboarding](https://resend.com/onboarding)
2. Set up your Resend API key in the `.env` file in the root directory
3. Verify your domain at [resend.com/domains/add](https://resend.com/domains/add)
4. Configure your email settings in `app/api/contact/route.ts`

---

### 3. Project Configuration

1. Clone this repository

   ```bash
   git clone https://github.com/yourusername/lockyolinks.git
   cd lockyolinks
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions or feedback, reach out at [jsphhabana@gmail.com](mailto:youremail@example.com)

---

## 🤖 Behind the Project

LockYoLinks was built through a unique workflow called **"vibe coding"** — a method where AI handles the heavy lifting of code, guided by a detailed plan created by the developer.

The concept, structure, and all feature requirements were planned and written by **Joseph Habana**, a 19-year-old with a strong understanding of programming logic but still learning the hands-on coding part. With the help of AI, Joseph was able to bring a fully functional, secure, and modern web app to life.

> “Security-wise, vibe coding isn’t the safest — but if you understand how things work and know how to secure your systems, it’s absolutely possible to build beautiful and reliable applications.”

**What is LockYoLinks?**

A secure link-locking platform that gives you control over who can access your URLs. With features like password locks, expiration settings, max-click limits, invite-only access, and personalized redirect pages — LockYoLinks ensures your links are seen only by the right people.

---

Thanks for checking out LockYoLinks! 🔐

## ISSUES!
Cant send using your own emails in contact page, resend api function error on my side --use onboarding@resend.dev for testing

