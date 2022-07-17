const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors =require('cors');
const cookieParser=require('cookie-parser')

//requiring dotenv file
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT || 5000;

//requiring connection to mongoDB
require('./db/conn');


//recieve data from frontend in json format
app.use(cookieParser()) 
app.use(express.json());
app.use(cors()) 
 
if(process.env.NODE_ENV==="production"){
    app.use(express.static("frontend/build"))
}


app.use(require('./router/adminRouter'))
app.use(require('./router/employeeRouter'))


app.listen(PORT,()=>console.log(`Listening to port ${PORT}`))