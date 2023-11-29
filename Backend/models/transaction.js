
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const transactionSchema = new Schema({ 
    transType:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

module.exports  = mongoose.model("transaction",transactionSchema)

