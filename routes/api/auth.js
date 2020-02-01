const express = require('express')

const router = express.Router()

const User = require('../../models/user')

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// @route POST api/auth
// @desc Auth User
// @access  public

const jwtSecret = config.get('jwtSecret')

router.post('/', (req, res) => {
    const { email, password } = req.body

    //Simple Validation

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' })
            }
            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: "Invalid Credientials" })
                    }
                    jwt.sign({ id: user.id,isAdmin:user.isAdmin }, //payload
                        config.get('jwtSecret'),
                        { expiresIn: 3600 }, //optional
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user:
                                    { id: user.id, name: user.name, email: user.email, isAdmin:user.isAdmin }
                            })
                        }

                    )
                })
        })
})

// @route GET api/auth/user
// @desc GET user data
// @access  private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})



//since the jwt is stateless, we need a way to keep validating the current user.
//and we can do this by using the token to get the current user.


module.exports = router;