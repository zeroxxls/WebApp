import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import process from 'node:process'
import { users } from '../../src/shared/data/users.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: users.length + 1,
      name,
      email,
      phone,
      password: hashedPassword,
    }

    users.push(newUser)

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({
      success: true,
      user: { id: newUser.id, name, email, phone },
      token,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error:', error })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find(u => u.email === email)

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
      token,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error:', error })
  }
}