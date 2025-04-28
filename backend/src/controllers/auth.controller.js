import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
export const signup = async (req,res) => {

    const {fullName ,email,password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        if (password.length < 6)
        {
            return res.status(400).json({ message: "Passowrd must be atleast 6 Characters"});
        }
        const user = await User.findOne({email})
        
        if(user)
        {
            return res.status(400).json({ message: "User Already exists!"});
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        }) 

        if(newUser)
        {
           generateToken(newUser._id,res); 
           await newUser.save();

           res.status(201).json({
            _id:newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
           })
        }
        else{
            return res.status(400).json({ message: "Invalid User Data"});
        }
    } catch (error) {
        console.log("Error during signup controller",error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export const signin = (req,res) => {
    res.send("signin route");
};

export const logout = (req,res) => {
    res.send("logout route");
};