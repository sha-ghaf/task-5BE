
const express = require ('express')
const User = require('../models/user.schema.js')
const router = express.Router()

/* ============== Post ==============*/
router.post ('/user' , (req , res) => {
    console.log(req.body)
    const user = new User (req.body)
    user.save()
    .then ((user) => {res.status(200).send(user)})
    .catch((error)=>{ res.status(400).send(error)})
})

/* ============== Get ==============*/
router.get ('/user' , (req , res) => {
    User.find({}).then ((users) =>{
        res.status(200).send(users)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

/* ============== Get By Id  ==============*/
router.get('/user/:id' , (req,res) => {
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then ((user) => {
    if(!user){
        return  res.status(404).send('User Is Not Defined')
    }
    res.status(200).send(user)
    }).catch ((error) => {
    res.status(500).send(error)
    })
})

/* ============== Patch ==============*/
router.patch('/user/:id' , async(req,res)=> {
    try {
        const _id = req.params.id 
        const user = await User.findByIdAndUpdate (_id , req.body , {
        new : true,
        runValidators : true
        })
        if(!user) {
        return res.status(404).send('No User Founded')
        }
        res.status(200).send(user)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

/* ============== Delete ==============*/
router.delete ('/user/:id' , async (req , res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send('UNABLE TO FIND USER')
        }
        res.status(200).send(user)
    }
    catch(error){
        res.status(500).send(error)
    }
})

module.exports = router 