const User = require('../models/User');
const {SECRET_KEY} = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign({email: user.email , name:user.name}, SECRET_KEY, {
      expiresIn: "2h", // Token expires in 2 hour
    });
};

const Login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        //check for user exists or not...
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({ error: 'User not found' });
        }

        // Compare hashed passwords
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        //generate token
        const token = generateToken(user);

        // console.log({token});
        return res.status(200).send({token});
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const Signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        //checking if user exists already
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        const user = await User.create({name,email,password:hashedPassword});

        const token = generateToken(user);
        // console.log({token});
        if(user){
            return res.status(201).send({token});
        }
        
    } catch (error) {
        return res.status(400).send(`Error: ${error}`);
    }
}

const Authenticate = async(req,res)=>{ 
    const {token} = req.body;
    try {
        const decodedToken = jwt.verify(token,SECRET_KEY);
        console.log(decodedToken);
        res.status(200).send(decodedToken);
    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
}

const getUserInfo = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(200).send(user);
        }
        return res.status(400).send('User not Found!');
    } catch (error) {
        return res.status(500).send(`Error:${error}`);
    }
}

module.exports = {Login,Signup,Authenticate,getUserInfo}