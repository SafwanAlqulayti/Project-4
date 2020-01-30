const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({

    title: { type: String, isRequired: true },

    author: { type: String, isRequired: true },

    ISBN: { type: Number, isRequired: true, unique: true}, //check the length in the book routes when posting a book.

    img_src:{type:String, default:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-865109088-1548970937.jpg"},

    description: { type: String, isRequired: true },

    publish_year: { type: Number, isRequired: true, min: 1000, max:(new Date().getFullYear())},

    language: { type: String, isRequired: true },

    publisher: { type: String, isRequired: true },

    category: { type: String, isRequired: true },

    quantity: { type: Number, isRequired: true, min: 0 }

})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;