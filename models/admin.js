const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    adminID:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
    }
})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin