const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const borrowerSchema = new Schema({


    borrowedBooksCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },

    borrowedBooksList: [{
        type: String,
        required: false,
    }],

    enquiries: [{
        type: Schema.Types.ObjectId,
        ref: 'Enquiry'
    }],

    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'BorrowRequest'
    }],

    

    userID:{type: String,
    required: true}
})





const Borrower = mongoose.model('Borrower', borrowerSchema)


module.exports = Borrower