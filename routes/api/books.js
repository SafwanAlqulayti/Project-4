const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')


const Book = require('../../models/Book')


// @route GET api/books
// @desc GET all books
// @access public


router.get('/', (req, res) => {
    Book.find()
        .sort({ date_addedate: -1 })
        .then(books => res.json(books))
})


// @route GET api/books/:id
// @desc GET a book using its ID
// @access public


router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
})

// @route POST api/books/:id
// @desc POST a new book
// @access  private



router.post('/', [auth, admin], (req, res) => {
    const { ISBN } = req.body

    if (ISBN) {
        Book.find({ ISBN: ISBN })
            .then(foundBook => {
                if (foundBook) {
                    //  console.log('found book')
                    return res.status(400).json({ message: 'Book Already Exists!' })

                }
            })
    }

    Book.create(req.body)
        .then((newBook) => { res.status(201).json({ new_book: newBook }) })
        .catch(error => res.status(400).json({ message: error }))
})


// @route DELETE api/books/:id
// @desc DELETE a book
// @access  private

router.delete('/:id', auth, (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then((deletedBook) => { res.status(201).json({ deleted_book: deletedBook }) })
        .catch(error => res.status(500).json({ error: error }))
})

// @route UPDATE api/books/:id
// @desc UPDATE a book
// @access  private

router.patch('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedBook) => { res.status(201).json({ updatedBook: updatedBook }) })
        .catch(error => res.status(500).json({ error: error }))
})

module.exports = router;