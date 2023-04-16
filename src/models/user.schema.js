const mongoose = require ('mongoose')
const validator = require ('validator')

const User = mongoose.model( 'User' , {
    name : {
        type: String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
        unique: true,
        validate(mail){
            if(!validator.isEmail(mail)){
                throw new Error ('Email Is Already Used')
            }
        }
    },
    age : {
        type: Number,
        default: 18,
        validate(age){
            if (age <= 0){
                throw new Error ("age must be positive number")
            }
        }
    },
    city: {
        type:String
    }
})

module.exports = User