//import packages
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose")
const socket=require("socket.io")

require("dotenv").config();

//get all routes
const userRoutes=require("./routes/userRoutes.js")
const messageRoute=require("./routes/messageRoute.js");


//implement app
const app=express();


app.use(cors())
app.use(express.json())
//matching front API
app.use("/api/auth",userRoutes)
app.use("/api/message",messageRoute)
//setup proxy for matching api
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });


//connect mongoose database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("success connect database")
}).catch((err)=>{
    console.log(err.message)
})

//start server
const server=app.listen(process.env.PORT,()=>{
console.log(`start server on port ${process.env.PORT}`)
})
//implement socket

//1-implement

const io=socket(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true,
    'force new connection':true
  },
  
})


//save online users
global.onlineUsers=new Map();
global.dataInfo=new Map();


//2-make socket connection
io.on("connection",(socket)=>{
  global.chatSocket=socket;
  //add user
  socket.on("add-user",(data)=>{
    if(data.currentUserId){
        onlineUsers.set(data.currentUserId,socket.id)
        console.log("online",onlineUsers)
    }
    socket.broadcast.emit("newArrive-users4",
     {
      username:data.username,
      email:data.email,
      avatarImage:data.avatarImage,
      _id:data.currentUserId
      }
    )
     
    
  })
  //send msg
  socket.on("send-msg",(data)=>{
    // dataInfo.set(data,socket.id)
     console.log("data",{data})
    const sendUserSocket=onlineUsers.get(data.to)
    if(sendUserSocket){
      io.to(sendUserSocket).emit("msg-recieve",data.message)
    }

  });

  //disconnect
  // socket.on("disconnect",()=>{
  //    console.log("disconnect")  
  // })
})


