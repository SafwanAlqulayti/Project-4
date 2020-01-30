const mongoose = require('mongoose')
const Schema = mongoose.Schema;




    const enquirySchema = new Schema({

        borrowerID:
        {
            type: Schema.Types.ObjectId,
            ref: 'Borrower',
            required: true,
        },
        bookID: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: false,
        },
        status: {
            type: String,
            required: true,
            default: 'open'
        },

        enqiry_title: {
            type: String,
            required: true,
        },

        enqiry_body: {
            type: String,
            required: true,
        },


        submitted_date: {
            type: Date,
            default: Date.now,
            required: true

        },

        response_date: { //leave it as (updated on " " in the displaying component)
            type: Date,
            default: Date.now,
            required: true
        }

        //need to add request id as something the user can reference (concat with a time stamp)

    })

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
        max: 5
    },

    borrowedBooksList: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
    }],

    enquiries: [enquirySchema],

    //May delete this later

    subscribtion_number: {
        type: Number,
        required: false,
        unique: true
    }

})




const Borrower = mongoose.model('Borrower', borrowerSchema)
const Enquiry = mongoose.model('Enquiry', enquirySchema)


module.exports = { Borrower, Enquiry }