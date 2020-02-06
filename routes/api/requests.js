const express = require('express')

const router = express.Router()

const Request = require('../../models/borrowRequest')

const Book = require('../../models/Book')

const User = require('../../models/user')

var async = require("async");


function getIndex (array, value) {
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
//     ({path:'requests', model:'Request',
//     populate:[{path:'address', model:'Address'},
//     {path:'book', model:'Book'}]
//   })

  .exec((err, requests) => {
    if (err) {
      return console.log(err);
    }

    res.json(requests) 

  })

  


        // .then(requests => res.json(requests))
        // .catch(error => res.json({ message: error }))
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


//-------------------test patch (the most important aspect of making the requests hehe)--------------------------

router.patch('/:id', (req, res) => {
    const { status,bookID,userID } = req.body
    console.log("hey found"+userID)
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

                   // targetBookID=foundRequest.book._id
                   // setBookID(foundRequest.book._id)
                   // borrowerID=foundRequest.borrowerID
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
                       
                        var bookIndex=foundUser.borrowedBooksList.indexOf(book)
                        console.log("book index is"+bookIndex)
                       // var bookIndex = foundUser.borrowedBooksList.indexOf(book)
                       foundUser.borrowedBooksList.splice(bookIndex,1)
                          //  tempArray[bookIndex]=''
                        //    console.log('tempArray is now '+tempArray)
                           // (foundUser.borrowedBooksList)=tempArray
                    }
                    else{
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

setBookID=(value)=>{
    targetBookID=value
}

// @route PATCH api/requests/:id
// @desc PATCH update a request using its ID
// @access public (change it to private)

// router.patch('/:id', (req, res) => {
//     const { status } = req.body.status
//     var requestStatus, requestNote = ''
//     Request.findById(req.params.id)
//         .then(foundRequest => {

//             if (status === 'approve') {
//                 requestStatus = 'Approved'
//                 requestNote = "Your request has been approved! Make sure to pay a visit within 3 days to get the book."
//             }
//             else if (status === 'confirm') {
//                 requestStatus = 'Confirmed'
//                 requestNote = "Your request has been confirmed"
//             }

//             else if (status === 'complete') {
//                 requestStatus = 'Complete'
//                 requestNote = ''
//             }

//             // Save the ID of the current book (will be used later for updating the user (borrower))

//             var targetBookID = foundRequest.book._id


//             // Update the book.
//             Book.findById(targetBookID)
//                 .then(foundBook => {

//                     // Define the set of updates to this specefic book document, based on the current status of the request.

//                     if (requestStatus === 'Approved') {
//                         foundBook.approvedRequests += 1;
//                     }
//                     else if (requestStatus === 'Confirmed') {
//                         foundBook.approvedRequests -= 1;
//                         foundBook.quantity -= 1;
//                     }
//                     else if (requestStatus === 'Complete') {
//                         foundBook.quantity += 1;
//                     }

//                     // Save the updated document of the book.
//                     foundBook.save((err, savedBook) => {
//                         if (err) {
//                             res.sendStatus(500);
//                             return;
//                         }
//                       //  res.json({ saved: savedBook });
//                     })

//                 })

//             //Update the User (Borrower).
//             Borrower.findById(foundRequest.borrowerID)
//                 .then(foundUser => {

//                     // Define the set of updates to this specefic borrower document,

//                     if (requestStatus === 'Confirmed') {
//                         foundUser.borrowedBooksCount += 1;
//                         (foundUser.borrowedBooksList).push(targetBookID);
//                     }
//                     else if (requestStatus === 'Complete') {
//                         foundUser.borrowedBooksCount -= 1;
//                         var bookIndex=getIndex(foundUser.borrowedBooksList,targetBookID)
//                         (foundUser.borrowedBooksList).splice(bookIndex,1)
//                     }

//                     foundUser.save((err, savedUser) => {
//                         if (err) {
//                             return res.json({ error: err })
//                         }
//                      //   res.json({ saved: savedUser });
//                     })

//                 })

//             // Continue with the main query of updating the request

//             foundRequest.status = reqStatus
//             foundRequest.note = reqNote
//             foundRequest.last_updated = Date.now()
//             foundRequest.save(((err, savedRequest) => {
//                 res.json(savedRequest);
//             })
//             )
//         })
//         .catch(error => res.json({ message: error }))
// })







//------------------------ still testing -----------------------------------



// router.patch('/:id', (req, res) => {

//     Request.findById(req.params.id)
//         .populate('book')
//         .exec((error, foundRequest) => {
//             if (error) {
//                 return res.json({ error: error })
//             }

//             //Update the book.
//             Book.findById(foundRequest.book.id)
//                 .then(foundBook => {
//                     foundBook.quantity += 1
//                     foundBook.save((err, savedBook) => {
//                         if (err) {
//                             return res.json({ error: err })
//                         }
//                         res.json({ saved: savedBook });
//                     })

//                 })

//                 .catch(error => res.json({ error: error }))


//             //main 'request' query
//             // res.json(savedBook)
//         })

// })




/// @route PATCH api/enquiries/:id
// @desc PATCH update an enquiry using its ID
// @access public (change it to private)

// router.patch('/:id', (req, res) => {
//     Enquiry.findById(req.params.id)
//         .then(foundEnquiry => {
//         foundEnquiry.status = 'answered'
//             foundEnquiry.response_date = Date.now()
//             foundEnquiry.response = req.body.response
//             foundEnquiry.save(((err, savedEnquiry) => {
//                 res.json(savedEnquiry);
//             })
//             )
//         })
//         .catch(error => res.json({ message: error }))
// })

// Enquiry.count({}, function( err, count){
//     console.log( "Total Number of Enquiries:", count );
// })



module.exports = router;