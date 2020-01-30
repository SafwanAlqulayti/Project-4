const express = require('express')

const router = express.Router()
const Admin=require('../../models/admin')
const User=require('../../models/user')


//router.get('/admin',auth,(req,res)=>{

router.get('/:id',(req,res)=>{

    // Admin.findOne({adminID:req.params.id}).populate('users')
    // // .select('-password')
    // .then(admin=> res.json(admin))
    // .catch(error=> res.json(error))

console.log(req.params.id)
Admin.find({adminID:req.params.id})
  .populate('adminID')    // <- pull in ingredient data
  .exec((err, admin) => {
    if (err) {
      res.json(err);
    }
    res.json(admin.adminID)
})
})
//since the jwt is stateless, we need a way to keep validating the current user.
//and we can do this by using the token to get the current user.


router.get('/',(req,res)=>{

    Admin.find()
    // .select('-password')
    .then(admin=> res.json(admin))
    .catch(error=> res.json(error))
})



module.exports = router;
