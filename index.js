//import dotenv
require("dotenv").config()

//import express
const express=require("express")

//import cors
const cors = require("cors")

//import router
const router = require('./routes')

//import mongoDB conenction file
require('./connection')

//create server
const pfServer = express()
//to connect with Frontend
pfServer.use(cors())

//parse json formate - json()
pfServer.use(express.json())

//router
pfServer.use(router)

//static-to export a file/folder from server side
pfServer.use('/uploads',express.static('./uploads'))

//Create Port
const PORT = 4000 || process.env.PORT

//Server checking the request received at port
pfServer.listen(PORT,()=>{
    console.log(`Server running successfully at port no:${PORT}`);
})



//logic
// pfServer.get('/get',(req,res)=>{
//     res.send('get request received')
// })

// pfServer.post('/post',(req,res)=>{
//     res.send('post request received')
// })

// pfServer.put('/put',(req,res)=>{
//     res.send('put request received')
// })

// pfServer.delete('/delete',(req,res)=>{
//     res.send('delete request received')
// })
