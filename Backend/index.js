const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const PORT = 5000
const Transaction = require("./models/transaction")

const db ='mongodb+srv://alatp574:123456789a@cluster1.rqnkebz.mongodb.net/?retryWrites=true&w=majority'

mongoose
    .connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((res)=>console.log("Connected to DB"))
    .catch((error)=>console.log(error))
app.get('/', (req,res)=>
{
    res.json({id:1,name:"Stepan", surname:"Wick"})
    
})

app.post('/add-transaction', (req,res)=>
{
    const {text,date,transType,amount} = req.body
    const transaction = new Transaction({text,date,transType,amount})
    transaction
    .save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})

app.listen(PORT, ()=>
{
    console.log("Server is running on port: " + PORT);
})