const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const borrowRequestSchema = new Schema({

    borrowerID:
    {
        type: Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true,
    },
    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    status: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true

    },

    last_updated: {
        type: Date,
        default: Date.now,
        required: true
    }

    //need to add request id as something the user can reference (concat with a time stamp)

})

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema)

module.exports = BorrowRequest