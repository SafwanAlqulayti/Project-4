const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({


    userID:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    borrowedBooksCount: {
        type: Number,
        required: false,
        min: 0,
        max:5
    },

    borrowedBooksList: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
    }],

    //May delete this later
    
    subscribtion_number: {
        type: Number,
        required: false,
        unique: true
    }

})

const Borrower = mongoose.model('Borrower', borrowerSchema)

module.exports = Borrower