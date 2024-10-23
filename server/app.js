require('dotenv').config();
const express = require('express');
const app = express();
const cors =require('cors');
const connectDB = require('./db/connect')
const auth = require('./routes/auth');
const blogs= require('./routes/blogs')

app.use(express.json());
app.use(cors());
app.use('/auth',auth);
app.use('/blogs',blogs);

const port = process.env.PORT || 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is Listening on Port ${port}...`);
        });    
    } catch (error) {
        console.log(error);
    }
}
start();