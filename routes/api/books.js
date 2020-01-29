const express=require('express')

const router=express.Router()
const auth=require('../../middleware/auth')

const Book=require('../../models/book')


// @route GET api/books
// @desc GET all books
// @access public


router.get('/', (req,res)=>{
    Book.find()
    .sort({date: -1})
    .then(books=> res.json(books))
})


// @route POST api/books/:id
// @desc POST a new book
// @access  private


router.post('/', auth,(req,res)=>{
    Book.create(req.body)
    .then((newBook)=>{res.json({new_book: newBook})})
    .catch(error=>res.json({error:error}))
})


// @route DELETE api/books/:id
// @desc DELETE a book
// @access  private

router.delete('/:id', auth, (req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then((deletedBook)=>{res.status(201).json({deleted_book: deletedBook})})
    .catch(error=>res.status(500).json({error:error}))
})

// @route UPDATE api/books/:id
// @desc UPDATE a book
// @access  private

  router.patch('/:id', auth, (req,res)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedBook)=>{res.status(201).json({updatedBook: updatedBook})})
    .catch(error=>res.status(500).json({error:error}))
})

module.exports=router;