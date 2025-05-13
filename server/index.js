import express from 'express';
import cors from 'cors';
import {users} from '../src/shared/data/users.js'; // ← подключение

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/register', (req, res) => {
    const { name, email, phone, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        phone,
        password,
    };

    users.push(newUser);
    res.status(201).json({ success: true, user: newUser });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Добавьте лог

    const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
    );
    
    if (!user) {
        console.log('User not found:', email); // Лог для отладки
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        });
    }

    res.json({ success: true, user });
});

app.listen(4444, () => {
    console.log('Server is running on http://localhost:4444');
});
