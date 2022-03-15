const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors =require('cors');

//requiring dotenv file
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT;

//requiring connection to mongoDB
require('./db/conn');

//middleware
const middleware=(req,res,next)=>{
    console.log('Hello From MiddleWare');
    next();
}

//recieve data from frontend in json format
app.use(express.json());
app.use(cors())

app.use(require('./router/auth'))



app.listen(PORT,()=>console.log(`Listening to port ${PORT}`))