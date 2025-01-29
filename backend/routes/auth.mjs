import express from "express";
import User from "../models/User.mjs";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.mjs";

const JWT_SECRET_KEY = 'secretKey';

const router = express.Router();
// Route 1: Create a User using: POST "/api/auth/createUser" - Doesn't require login
router.post(
    "/createUser",
    [
        body("name", "Enter a valid name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 5 }),
        body("**").escape(),
    ],
    async (req, res) => {
        let statusMessage = 'failed';
        const { name, password, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusMessage, msg: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(password, salt);

        const newUser = User({
            name,
            password: secretPassword,
            email,
        });

        newUser
            .save()
            .then(() => {
                const payload = {
                    user: {
                        id: newUser.id,
                    },
                };
                const authToken = jwt.sign(payload, JWT_SECRET_KEY);
                statusMessage = 'success';
                return res.status(200).json({
                    statusMessage,
                    msg: `User: ${name} has been created. This is the id: ${authToken}`
            });
            })
            .catch((error) =>
                res.status(500).json({statusMessage, msg: `User: ${name} not created due to ${error.message}`})
            );
    }
);

// Route 2: Login for a user: POST "/api/auth/userLogin" - Doesn't require login
router.post(
    "/userLogin",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Enter a valid password").isLength({ min: 5 }),
        body("**", " Empty fields are not allowed").escape(),
    ],
    async (req, res) => {
        let statusMessage = 'failed';
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusMessage, msg: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ statusMessage, msg: "User does not exist" });
            }
            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!passwordMatch) {
                return res.status(400).json({ statusMessage, msg: "Incorrect password" });
            }
            const payload = {
                user: {
                    id: existingUser.id,
                },
            };
            const authToken = jwt.sign(payload, JWT_SECRET_KEY);
            statusMessage = 'success';
            return res.status(200).json({statusMessage, msg: authToken});
        } catch (error) {
            return res.status(500).json({ statusMessage, msg: "Internal server error" });
        }
    }
);

// Route 3: Get user data after logging in "/api/auth/userData"
router.get('/userData', fetchUser, async (req, res) => {
    let statusMessage = 'failed';
    try {
        const userId = req.userId;
        const userData = await User.findById(userId).select('-password');
        statusMessage = 'success';
        return res.status(200).json({statusMessage, msg: userData});
    } catch (error) {
        return  res.status(500).json({statusMessage, msg: 'Internal server error'});
    }
});

export default router;
