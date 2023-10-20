
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    text: {
        type:String,
        required:true,
    },
    date:{
        type: String,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    transType:{
        type:String,
        required:true
    }
})

const Transaction = mongoose.model("transaction",transactionSchema)

module.exports = Transaction

