const express = require('express')

const router = express.Router()

const Borrower = require('../../models/borrower')

const Enquiry = require('../../models/enquiry')

const Request = require('../../models/borrowRequest')
const User = require('../../models/user')
const Address = require('../../models/address')



var async = require("async");


const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')

//--------------------------------------------------------------------------------------------------
//create a borrower document (just for testing the backend in this small project)

router.post('/', (req, res) => {
  Borrower.create(req.body)
    .then((newBorrower) => { res.json({ new_Borrower: newBorrower }) })
    .catch(error => res.json({ message: error }))
})


router.get('/', (req, res) => {
  Borrower.find()
    .sort({ date: -1 })
    .then(books => res.json(books))
})

router.get('/:id', (req, res) => {

  Borrower.findById(req.params.id)
    .populate('book')
    .exec((error, foundRequest) => {
      if (error) {
        return res.json({ error: error })
      }
      res.json(foundRequest)
    })

})
//--------------------------------------------------------------------------------------------------


// // @route POST api/users/:id/enquiries
// // @desc POST a new enquiry
// // @access  private

// router.post('/:id/enquiries', (req, res) => {
//   const newEnquiry = new Enquiry(req.body);

//   Enquiry.create(newEnquiry)
//     .then((new_Enquiry) => { res.json({ new_enquiry: new_Enquiry }) })
//     .catch(error => res.json({ message: error }))


//   Borrower.findById(req.params.id, (error, foundUser) => {
//     foundUser.enquiries.push(newEnquiry);
//     foundUser.save((err, savedUser) => {
//       res.json(savedUser);
//     });
//   });
// }); //working great!


// test enquiry with ID

router.post('/:id/enquiries', (req, res) => {
  const newEnquiry = new Enquiry(req.body);

  async.parallel([
    function (callback) {
      Enquiry.countDocuments({}, function (err, count) {
        console.log("Total Number of Enquiries:", count);

        newEnquiry.enquiryID = `Enq000${count + 1}`
        newEnquiry.userID = req.params.id
        newEnquiry.save((err, savedEnquiry) => {
          if (err) {
            return res.json({ error: err })

          }
          //res.json(savedEnquiry);

          callback(null, savedEnquiry);

        });

      })
    },
    function (callback) {
      User.findById(req.params.id, (error, foundUser) => {
        foundUser.enquiries.push(newEnquiry);
        foundUser.save((err, savedUser) => {
          console.log(savedUser)
          if (err) {
            return res.json({ error: err })

          }
          // res.json(savedUser);
          callback(null, savedUser);

        });
      });

    }],

    function (err, results) {
      res.json({ 'results': results })
      //your final callback here.
    });





}) //end of get enquiries count
//end of post 

//})


//-----------------for posting requests---------------------------



router.post('/:id/requests', (req, res) => {
  const newRequest = new Request(req.body);
  console.log('new request is ' + newRequest)
  const newAddress = new Address(req.body);
  console.log("new address is " + newAddress)


  var count;

  async.parallel([
    function (callback) {
      newAddress.save((err, savedAddress) => {
        if (err) {
          return res.json({ error: err })

        }


        //res.json(savedEnquiry);

        callback(null, savedAddress);

      });

    },
    function (callback) {
      Request.countDocuments({}, function (err, count) {
        console.log("Total Number of Requests:", count);

        newRequest.requestID = `Req00${count + 1}`
        newRequest.userID = req.params.id
        newRequest.address = newAddress

        newRequest.save((err, savedRequest) => {
          if (err) {
            return res.json({ error: err })

          }
          //res.json(savedEnquiry);

          callback(null, savedRequest);

        });

      })
    },


    function (callback) {
      User.findById(req.params.id, (error, foundUser) => {
        foundUser.hasActiveRequests = true
        foundUser.requests.push(newRequest);
        foundUser.address = newAddress
        foundUser.save((err, savedUser) => {
          if (err) {
            return res.json({ error: err })

          }
          // res.json(savedUser);
          callback(null, savedUser);

        });
      });

    }],

    function (err, results) {
      res.json({ 'results': results })
      //your final callback here.
    });





}) //end of get enquiries count
//end of post 

//-----------------------------------------------------------------------------------------------

// @route POST api/users/:id/requests
// @desc POST a new request
// @access private

// router.post('/:id/requests', (req, res) => {
//   const newRequest = new Request(req.body);

//   Request.countDocuments({}, function( err, count){
//     console.log( "Total Number of Requests:", count );

//     newRequest.requestID=`Req00${count+1}`
//     newRequest.userID=req.params.id
//     //send current user's address
//     newRequest.save((err, savedRequest) => {
//       res.json(savedRequest);
//     });



//     User.findById(req.params.id, (error, foundUser) => {
//       foundUser.hasActiveRequests=true
//       foundUser.requests.push(newRequest);
//       foundUser.save((err, savedUser) => {
//         res.json(savedUser);
//       });
//     });
// }) //end of get enquiries count
// }) //end of post 


// @route GET api/users/:id/enquiries
// @desc GET all of a user's enquiries using the user's ID 
// @access  private

router.get('/:id/enquiries', (req, res) => {

  User.findById(req.params.id)
    .populate('enquiries')
    .exec((err, borrower) => {
      if (err) {
        return console.log(err);
      }

      res.json(borrower.enquiries)

    })

})


router.get('/:id/requests', (req, res) => {

  User.findById(req.params.id)
    .populate({
      path: 'requests', model: 'Request',
      populate: [{ path: 'address', model: 'Address' },
      { path: 'book', model: 'Book' }]
    })

    .exec((err, borrower) => {
      if (err) {
        return console.log(err);
      }

      res.json(borrower.requests)

    })

})



router.get('/getByID/:id', (req, res) => {
  Borrower.findOne({ userID: req.params.id })
    .populate('enquiries', 'requests')
    .exec((err, borrower) => {
      if (err) {
        return console.log(err)
      }

      { res.json(borrower) }


    })
})






//Works fine, we just need to specify the required fields to be updated 
//for the enquiry, it'll be the response, update date and the status to 'answered'

// router.patch('/:id/enquiries/:enquiryid', (req, res) => {
//   Borrower.findById(req.params.id, (error, foundUser) => {
//     var selectedWithoutFilter = foundUser.enquiries.id(req.params.enquiryid)
//     selectedWithoutFilter.enqiry_title = req.body.enqiry_title
//     foundUser.save((err, savedUser) => {
//       res.json(savedUser);
//     });
//   });
// });

// router.get('/enquiries', (req, res) => {
//   //console.log(hey)
//   var list = []
//   Borrower.find()
//     .then(foundUsers => {
//       console.log(foundUsers)
//       for (i = 0; i < foundUsers.length; i++) {
//         //console.log('in for loop')
//         if ((foundUsers[i].enquiries).length > 0) {
//           for (j = 0; j < (foundUsers[i].enquiries).length; i++) {
//             // list.push(foundUsers[i].enquiries[j])
//           }
//         }
//       } //end of main for loop
//       res.json({ found: list })
//     })
//     .catch(error => res.json({ message: error }))
// });


//post address:


router.post('/:id/address', (req, res) => {
  const newAddress = new Address(req.body);

  async.parallel([
    function (callback) {
      newAddress.save((err, savedAddress) => {
        if (err) {
          return res.json({ error: err })

        }

        //res.json(savedEnquiry);

        callback(null, savedAddress);

      });

    },
    function (callback) {
      User.findById(req.params.id, (error, foundUser) => {
        foundUser.address = newAddress
        foundUser.hasAddress = true
        foundUser.save((err, savedUser) => {
          console.log(savedUser)
          if (err) {
            return res.json({ error: err })

          }
          // res.json(savedUser);
          callback(null, savedUser);

        });
      });

    }],

    function (err, results) {
      res.json({ 'results': results })
      //your final callback here.
    });


})
module.exports = router;