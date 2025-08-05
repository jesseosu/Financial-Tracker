require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const bcrypt = require('bcryptjs');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    await User.deleteMany({});
    await Transaction.deleteMany({});

    const hashedPassword = await bcrypt.hash('testpass123', 10);
    const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
    });

    const transactions = [
        { userId: user._id, amount: 2000, type: 'income', category: 'Salary', date: new Date('2025-07-01') },
        { userId: user._id, amount: 100, type: 'expense', category: 'Groceries', date: new Date('2025-07-02') },
        { userId: user._id, amount: 300, type: 'expense', category: 'Transport', date: new Date('2025-07-03') },
        { userId: user._id, amount: 50, type: 'expense', category: 'Coffee', date: new Date('2025-07-03') },
    ];

    await Transaction.insertMany(transactions);

    console.log('Seeding complete. User credentials:');
    console.log('Email: test@example.com');
    console.log('Password: testpass123');

    mongoose.disconnect();
}

seed();
