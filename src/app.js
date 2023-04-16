const express = require ('express')
const port = process.env.PORT || 5000
const userRouter = require("./routers/user")
require('./db/mongoose.js')

const app = express()
app.use(express.json())
app.use(userRouter)
app.listen( port , () => {
    console.log("App listen to port " + port )
})

