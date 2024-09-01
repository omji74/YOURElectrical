import express from 'express'
import bcrypt from 'bcrypt'
const router  = express.Router();
import User from '../models/User.js'

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        console.log(newUser);

        await newUser.save();
        return res.json({ message: "Registered Successfully" });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const errors = err.errors;
            let errorMessage = "Validation failed: ";
            for (const field in errors) {
                errorMessage += `${errors[field].message} `;
            }
            return res.status(400).json({ message: errorMessage });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});
export {router  as UserRouter};
