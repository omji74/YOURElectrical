import express from 'express'
import bcrypt from 'bcrypt'
const router  = express.Router();
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


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
router.post('/forgot-password',async(req,res)=>{
    const {email} = req.body;
    try{
        const user  = await User.findOne({email})
        if(!user){
            return res.json({message:"user not found or not registered user"});
        }
     const token  = jwt.sign({id:user._id},process.env.KEY,{expiresIn:'5m'})
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omjidwivedi74@gmail.com',
    pass: 'cxbfkvggzijhluss'
  }
});

var mailOptions = {
  from: 'omjidwivedi74@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js omji dwivedi',
  text: `http://localhost:5173/resetPassword/${token}` ,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return res.json({message:"Error sending email"});
  } else {
    return res.json({status:true,message : "email sent"});
  }
});

    }
    
    catch(err){
        console.log(err);

    }
})
router.post('/reset-password/:token',async(req,res)=>{
    const token =  req.params.token;
    const {password} = req.body
    try{
        // console.log("Hii");
        const decoded =await jwt.verify(token,process.env.KEY);
        const id  = decoded.id;
        const hashPassword = await bcrypt.hash(password,10);
        await User.findByIdAndUpdate({_id:id},{password:hashPassword});
        // console.log("hii form line non 110")
        return res.json({status:true,message:"updated password"})
    }
    catch(err){
        // console.log("hii from backend error")
        return res.json({message:"having some error "})
    }
})

const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false, message: "no token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      next()
  
    } catch (err) {
      return res.json(err);
    }
  };
  


router.get("/verify",verifyUser, (req, res) => {
    return res.json({status: true, message: "authorized"})
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    console.log("Not suceesse")
    return res.json({status: true})
})


export {router  as UserRouter};
