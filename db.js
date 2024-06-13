const mongoose=require('mongoose');
//Define the mongodb connection url
const mongoURL='mongodb://127.0.0.1:27017/hotels'//replace mydatabase with your database name
//Set uo MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//Get the Defualt connection
//Mongoose maintains a default connection object represent the mongodb connection
const db=mongoose.connection;
//define event listeners for database connections
db.on('connected',()=>{
    console.log("Connected to MongoDB server!");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error:",err);
})

db.on('disconnected',()=>{
    console.log("DisConnected to MongoDB server!");
})
//export the database connection
module.exports=db;