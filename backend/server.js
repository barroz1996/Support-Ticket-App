const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()

// Get data from body
app.unsubscribe(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
  res.status(201).json({message: 'Welcome to the Support Desk API'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))