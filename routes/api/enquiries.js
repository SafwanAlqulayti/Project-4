const express=require('express')

const router=express.Router()
const auth=require('../../middleware/auth')

const Enquiry=require('../../models/borrower').Enquiry


// @route GET api/enquiries
// @desc GET all enquiries
// @access public (change it to private)
// Only accessed by an admin

router.get('/', (req,res)=>{
    Enquiry.find()
    .then(enquiries=> res.json(enquiries))
})



// @route GET api/enquiries/:id
// @desc GET an enquiry using its ID
// @access public (change it to private)
// accessed by admin and user by clicking on a specific enquiry in a list

router.get('/:id', (req,res)=>{
    Enquiry.findById(req.params.id)
    .then(book=> res.json(book))
})

// @route POST api/books/:id
// @desc POST a new book
// @access  private


router.post('/', auth,(req,res)=>{
    const { ISBN } = req.body

    if(ISBN){
    Book.find({ISBN:ISBN})
    .then(foundBook=> {
        if(foundBook){
            console.log('found book')
            return res.status(400).json({ message: 'Book Already Exists!' })

        }})
    }
    Book.create(req.body)
    .then((newBook)=>{res.json({new_book: newBook})})
    .catch(error=>res.json({message:error}))
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

  router.patch('/:id', auth ,(req,res)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedBook)=>{res.status(201).json({updatedBook: updatedBook})})
    .catch(error=>res.status(500).json({error:error}))
})

module.exports=router;