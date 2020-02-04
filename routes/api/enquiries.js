const express = require('express')

const router = express.Router()

const Enquiry = require('../../models/enquiry')
const auth=require('../../middleware/auth')
const admin=require('../../middleware/admin')

// @route GET api/enquiries
// @desc GET all enquiries
// @access public (change it to private)
// Only accessed by an admin

router.get('/', (req, res) => {
    Enquiry.find()
        .then(enquiries => res.json(enquiries))
        .catch(error => res.json({ message: error }))
})

/// @route GET api/enquiries/:id
// @desc GET an enquiry using its ID
// @access public (change it to private)
// accessed by admin and user by clicking on a specific enquiry in a list

router.get('/:id', (req, res) => {
    Enquiry.findById(req.params.id)
        .then(foundEnquiry => res.json(foundEnquiry))
        .catch(error => res.json({ message: error }))

})

/// @route PATCH api/enquiries/:id
// @desc PATCH update an enquiry using its ID
// @access public (change it to private)

router.patch('/:id', (req, res) => {
    Enquiry.findById(req.params.id)
        .then(foundEnquiry => {
        foundEnquiry.status = 'answered'
            foundEnquiry.response_date = Date.now()
            foundEnquiry.response = req.body.response
            foundEnquiry.save(((err, savedEnquiry) => {
                res.json(savedEnquiry);
            })
            )
        })
        .catch(error => res.json({ message: error }))
})

    // Enquiry.count({}, function( err, count){
    //     console.log( "Total Number of Enquiries:", count );
    // })



module.exports = router;