const { getId } = require("../middlewares/auth")
const User = require("../models/profile")

const getProfile = async (req, res) => {
  const token = req.headers["authorization"]
  if (token == "null") return res.json({ message: "Please Login first" })

  const id = await getId(token)
  if (id == null) return res.error({ Message: "Not found" })
  const user = await User.findById(id)
  res.json({
    user,
  })
}

const updateProfile = async (req, res) => {
  const token = req.headers["authorization"]
  if (token == "null") return res.json({ message: "Please Login first" })

  const id = await getId(token)
  const { name, email, password } = req.body

  const user = await User.findByIdAndUpdate(id, { name, email, password })

  res.json({
    message: "Updated Successfully",
    user,
  })
}

const deleteProfile = async (req, res) => {
  const token = req.headers["authorization"]
  if (token == "null") return res.json({ message: "Please Login first" })

  const id = await getId(token)
  const user = await User.findByIdAndDelete(id)

  res.json({
    message: "Deleted Successfully",
    user,
  })
}

module.exports = { getProfile, updateProfile, deleteProfile }
