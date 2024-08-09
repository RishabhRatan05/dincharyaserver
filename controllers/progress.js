const { default: mongoose } = require("mongoose")
const User = require("../models/profile")
const Todo = require("../models/progress")
const { getId } = require("../middlewares/auth")

const getAllProgress = async (req, res) => {
  const token = req.headers["authorization"]
  if (typeof token == "undefined")
    return res.json({ message: "Please Login first" })

  const id = await getId(token)

  if (id == null) return res.json({ message: "No fields" })

  const progress = await Todo.find({ profile: id })

  const daa = JSON.stringify(progress)

  res.json({
    daa,
  })
}

const createProgress = async (req, res) => {
  const token = req.headers["authorization"]
  const id = await getId(token)

  if (id == null) return res.json({ message: "No field" })
  const data = req.body
  const { title, description, isCompleted } = data
  const todo = await Todo.create({
    title,
    description,
    isCompleted,
    profile: id,
  })
  const user = await User.findByIdAndUpdate(id, { $push: { todos: todo._id } })

  res.status(202).json({
    success: true,
    todo,
  })
}

const updateProgress = async (req, res) => {
  const { title, description, isCompleted, id } = req.body
  const todo = await Todo.findByIdAndUpdate(id, {
    title,
    description,
    isCompleted,
  })

  res.json({
    message: "successfully updated",
    todo,
  })
}

const deleteProgress = async (req, res) => {
  const id = req.params.id
  const todo = await Todo.deleteOne({ _id: id })

  res.json({
    success: true,
    todo,
  })
}
module.exports = {
  getAllProgress,
  createProgress,
  deleteProgress,
  updateProgress,
}
