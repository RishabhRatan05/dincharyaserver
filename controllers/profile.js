const User = require("../models/profile")

const getProfile = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)

  res.json({
    user
  })
}

const updateProfile =async (req,res)=>{
    const id = req.params.id
    const {name, email, password} = req.body

    const user =await User.findByIdAndUpdate(id, { name, email, password })

    res.json({
        message:"Updated Successfully",
        user
    })
}

const deleteProfile = async (req,res)=>{
  const id = req.params.id
  const user =await User.findByIdAndDelete(id)

  res.json({
    "message":"Deleted Successfully",
    user
  })
}

module.exports ={getProfile, updateProfile, deleteProfile}