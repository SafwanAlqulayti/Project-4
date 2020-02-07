const express = require('express')

const router = express.Router()

const Request = require('../../models/borrowRequest')

const Book = require('../../models/Book')

const User = require('../../models/user')

var async = require("async");


function getIndex(array, value) {
    var index = array.indexOf(value)
    return index;
}


// @route GET api/enquiries
// @desc GET all enquiries
// @access public (change it to private)
// Only accessed by an admin

router.get('/', (req, res) => {
    Request.find()
        .populate('book').populate('address')
        .exec((err, requests) => {
            if (err) {
                return console.log(err);
            }

            res.json(requests)

        })

})



/// @route GET api/requests/:id
// @desc GET a request using its ID
// @access public (change it to private)
// accessed by admin and user by clicking on a specific request in a list

router.get('/:id', (req, res) => {

    Request.findById(req.params.id)
        .populate('book').populate('address')
        .exec((error, foundRequest) => {
            if (error) {
                return res.json({ error: error })
            }
            res.json(foundRequest)
        })

})


// @route PATCH api/requests/:id
// @desc PATCH update a request using its ID
// @access public (change it to private)

router.patch('/:id', (req, res) => {
    const { status, bookID, userID } = req.body
    console.log("hey found" + userID)
    // var targetBookID;
    // var borrowerID='';
    var requestStatus
    var requestNote
    if (status === "Approve") {
        requestStatus = 'Approved'
        requestNote = "Your request has been approved! We'll contact you as soon as the book is coming to you!"
    }
    else if (status === "Confirm") {
        requestStatus = "Book Delivered"
        requestNote = "Your Book has been delievered, enjoy spending time with your friend!"
    }

    else if (status === "Complete") {
        requestStatus = 'Book Returned'
        requestNote = "Thank You for Trusting Majeed's Library!"
    }


    async.parallel([
        function (callback) {
            console.log('requestStatus is' + status)

            Request.findById(req.params.id)
                .then(foundRequest => {

                    // Continue with the main query of updating the request

                    foundRequest.status = requestStatus
                    console.log(foundRequest)
                    console.log('request is' + requestStatus)
                    foundRequest.note = requestNote
                    foundRequest.last_updated = Date.now()
                    foundRequest.save((err, savedRequest) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(savedRequest)
                        callback(null, savedRequest);
                    })

                })

        },
        function (callback) {
            //console.log('book id'+targetBookID)
            Book.findById(bookID)
                .then(foundBook => {

                    // Define the set of updates to this specefic book document, based on the current status of the request.

                    if (requestStatus === 'Approved') {
                        foundBook.approvedRequests += 1;
                    }
                    else if (requestStatus === 'Book Delivered') {
                        foundBook.approvedRequests -= 1;
                        foundBook.quantity -= 1;
                    }
                    else if (requestStatus === 'Book Returned') {
                        foundBook.quantity += 1;
                    }

                    // Save the updated document of the book.
                    foundBook.save((err, savedBook) => {
                        if (err) {
                            res.sendStatus(500);
                            return;
                        }
                        callback(null, savedBook)

                    })

                })

            // callback(null, CustDoc);
            // });
        },

        function (callback) {

            User.findById(userID)
                //console.log("looking for the user "+borrowerID)
                .then(foundUser => {
                    console.log(foundUser)
                    // Define the set of updates to this specefic borrower document,

                    if (requestStatus === "Book Delivered") {
                        foundUser.borrowedBooksCount += 1;
                        (foundUser.borrowedBooksList).push(book);
                    }
                    else if (requestStatus === "Book Returned") {
                        foundUser.borrowedBooksCount -= 1;

                        var bookIndex = foundUser.borrowedBooksList.indexOf(book)
                        console.log("book index is" + bookIndex)
                        // var bookIndex = foundUser.borrowedBooksList.indexOf(book)
                        foundUser.borrowedBooksList.splice(bookIndex, 1)
                        //  tempArray[bookIndex]=''
                        //    console.log('tempArray is now '+tempArray)
                        // (foundUser.borrowedBooksList)=tempArray
                    }
                    else {
                        console.log('no action')
                    }

                    foundUser.save((err, savedUser) => {
                        if (err) {
                            return res.json({ error: err })
                        }
                        callback(null, savedUser)
                    })

                })
        }],

        function (err, results) {
            res.json({ 'results': results })
            // results is now equals to: {adminName: AdminDoc, customerName: CustDoc}
            //your final callback here.
        });
})

setBookID = (value) => {
    targetBookID = value
}


module.exports = router;