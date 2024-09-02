import express from 'express'
import bcrypt from 'bcrypt'
const router  = express.Router();
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
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

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user  = await User.findOne({email});
    if(!user)
    {
        return res.json({message:"user is not registered"});

    }
    const validPassword  = await bcrypt.compare(password,user.password)
    if(!validPassword)
    {
        return res.json({message:"password is incorrect"});

    }
    const token  = jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'});
    res.cookie('token',token,{httpsOnly:true,maxAge:360000});
    return res.json({status: true,message:"login successfully"});

   
})
export {router  as UserRouter};
