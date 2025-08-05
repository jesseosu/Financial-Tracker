# Personal Finance Tracker

A full-stack web application to help users manage income and expenses, visualize financial habits, and stay on budget. Built for internship applications like the 2025/26 CommBank Summer Intern Program (Engineering, Data, Product Strategy).

---

## Features

- JWT Authentication (Register/Login/Logout)
- Add, track, and visualize income/expenses
- Monthly financial summary with bar charts
- Persistent data stored with MongoDB
- Responsive UI styled with Tailwind CSS
- Real-time updates on the dashboard
- Deployable to Vercel (Frontend) + Render (Backend)

---

## Tech Stack

| Layer       | Tech                                 |
|-------------|--------------------------------------|
| Frontend    | React.js, Tailwind CSS, Axios        |
| Backend     | Node.js, Express.js, JWT Auth        |
| Database    | MongoDB (via Mongoose)               |
| Deployment  | Vercel (Frontend) + Render (Backend) |

---

## Getting Started (Local Setup)

### Prerequisites

- Node.js ≥ 18.x
- MongoDB Atlas or local MongoDB
- Git

---

### Clone and Install

```bash
git clone https://github.com/jesseosu/Financial-Tracker.git
cd Financial-Tracker

# Backend Setup
cd server
npm install

touch .env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

npm run dev

#Frontend Setup
cd ../client
npm install
npm start

#Demo Credentials
cd server
npm run seed

Test login:

Email: test@example.com
Password: testpass123

