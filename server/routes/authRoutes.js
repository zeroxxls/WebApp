import express from 'express'
import { registerUser,loginUser,getUserById  } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserById)

export default router
