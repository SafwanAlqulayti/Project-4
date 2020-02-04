const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const borrowRequestSchema = new Schema({

    borrowerID:
    {
        type: String,
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Sent'
    },

    date: {
        type: Date,
        default: Date.now,
        required: true

    },

    last_updated: {
        type: Date,
        //default: Date.now,
        required: false
    },
    note:{
        type:String,
        required:true,
        default: "Request sent"
    },
    requestID:{
        type: String,
        required: true
    }

    //need to add request id as something the user can reference (concat with a time stamp)

})

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema)

module.exports = BorrowRequest