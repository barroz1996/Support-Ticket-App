const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc  Get user ticket
// @route Get /api/tickets
// @access Private 
const getTickets = asyncHandler( async(req,res) => {
  // Get user using the id in the JWT 
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  const tickets = await Ticket.find({user: req.user.id})
  res.status(200).json(tickets)
})



// @desc  Get user ticket
// @route Get /api/tickets/:id
// @access Private 
const getTicket = asyncHandler( async(req,res) => {
  // Get user using the id in the JWT 
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc  Create new ticket
// @route Post /api/tickets
// @access Private 
const createTicket = asyncHandler( async(req,res) => {
  const {product, description} = req.body
  if(!product || ! description){
    res.status(401)
    throw new Error('Please add a product and description')
  }

   // Get user using the id in the JWT 
   const user = await User.findById(req.user.id)
   if(!user){
     res.status(401)
     throw new Error('User not found')
   }

   const ticket = await Ticket.create({
    product,
    description,
    user:req.user.id,
    status: 'new',
   })

  res.status(201).json(ticket)
})


// @desc  Delete user ticket
// @route Delete /api/tickets/:id
// @access Private 
const deleteTicket = asyncHandler( async(req,res) => {
  // Get user using the id in the JWT 
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }
  try {
    await Ticket.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle any errors that occur during deletion
    console.error('Error deleting ticket:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  res.status(200).json({success: true})
})

// @desc  Update user ticket
// @route Put /api/tickets/:id
// @access Private 
const updateTicket = asyncHandler( async(req,res) => {
  // Get user using the id in the JWT 
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true })
  res.status(200).json(updatedTicket)
})


module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}