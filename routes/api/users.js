const express = require('express')

const router = express.Router()

const User = require('../../models/user')
const Borrower = require('../../models/borrower')

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

// @route POST api/users
// @desc Register new user
// @access  public

const jwtSecret = config.get('jwtSecret')
router.post('/', (req, res) => {
    const { name, email, password } = req.body

    //Simple Validation

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' })
            }

            //User.create(req.body)
            const newUser = new User({
                name, email, password
            })

            //create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    newUser.password = hash
                    newUser.save().then(user => {

                        jwt.sign({ id: user.id , isAdmin: user.isAdmin}, //payload
                            config.get('jwtSecret'),
                            { expiresIn: 3600 }, //optional
//add to borrowers' document

                            (err, token) => {
                                if (err) throw err

                                const newBorrower= new Borrower()
                                newBorrower.userID=user.id
                                newBorrower.save(function (err, savedBorrower) {
                                    if (err) {
                                      return console.log(err);
                                    } else {
                                      console.log('added to borrowers table ', savedBorrower);
                                    }
                                  });
                                  
                                    res.json({ token,
                                        user:
                                            { id: user.id, name: user.name, email: user.email, isAdmin:user.isAdmin }
                                    })
                            }

                        )


                    })
                })
            })

        })
    // Item.find()
    // .sort({date: -1})
    // .then(items=> res.json(items))

    // res.send('register')
})


// router.post('/', (req,res)=>{
//     console.log(req.body.name)
//     Item.create(req.body)
//     .then((newItem)=>{res.status(201).json({new_item: newItem})})
//     .catch(error=>res.status(500).json({error:error}))
// })


// router.delete('/:id', (req,res)=>{
//     console.log(req.body.name)
//     Item.findByIdAndDelete(req.params.id)
//     .then((deletedItem)=>{res.status(201).json({deleted_Item: deletedItem})})
//     .catch(error=>res.status(500).json({error:error}))
// })

// router.patch('/:id', function(req, res) {
//     Item.findById(req.params.id)
//       .then(function(uitem) {
//         if(uitem) {
//           // Pass the result of Mongoose's `.update` method to the next `.then`
//           return uitem.update(req.body);
//         } else {
//           // If we couldn't find a document with the matching ID
//           res.status(404).json({
//             error: {
//               name: 'DocumentNotFoundError',
//               message: 'The provided ID doesn\'t match any documents'
//             }
//           });
//         }
//       })
//       .then(function() {
//         // If the update succeeded, return 204 and no JSON
//         res.status(204).end();
//       })
//       // Catch any errors that might occur
//       .catch(function(error) {
//         res.status(500).json({ error: error });
//       });
//   });

// router.get('/borrower', (req, res) => {

// Borrower.find().populate('userID')
//   .exec((err, borrowers) => {
//     if (err) {
//       return console.log(err);
//     }
//     const specifiedBorrower=borrowers.filter(borrower=>(borrower.userID.email=='abc@book.com'))
    
//     res.json(specifiedBorrower)
// })
// })


//working fine
// router.get('/borrower', (req, res) => {

//     Borrower.find().populate('userID')
//       .exec((err, borrowers) => {
//         if (err) {
//           return console.log(err);
//         }
        
//         res.json(borrowers)
//     })
//     })

module.exports = router;