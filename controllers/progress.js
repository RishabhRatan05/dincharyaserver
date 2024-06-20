const User = require("../models/profile")
const Todo = require("../models/progress")

const getAllProgress = async(req,res)=>{
  const id = req.params.id

    const progress = await Todo.find({profile:id})
    // const user = await User.findById(id)

    // const progress =[]
    // user.todos.forEach(async(id)=>{
    //   const todo = await Todo.findById(id)
    //   const {title,description,isCompleted} = todo
    //   progress.push({ title, description, isCompleted })
    //   console.log('inside',progress)
    // })

    const daa = JSON.stringify(progress)
    // console.log('daa',daa)

    res.json({
      // daa,
      daa
    })
}

const createProgress =async (req,res)=>{
  const id = req.params.id
  const data = (req.body)
  console.log('Something Wrong',data)
    const { title, description, isCompleted} = (data)
    const todo = await Todo.create({ title, description, isCompleted,profile:id})
    const user = await User.findByIdAndUpdate(id,{$push:{todos:todo._id}})
    
    res.status(202).json({
        success:true,
        todo,

    })
}


const updateProgress  = async(req,res)=>{
  const {title,description,isCompleted,id} = req.body
  const todo = await Todo.findByIdAndUpdate(id, {
    title,
    description,
    isCompleted,
  })

  res.json({
    "message":"successfully updated",
    todo
  })
}

const deleteProgress = async(req,res)=>{
  const id = req.params.id

  // need to delete task from the profile of the task user
  
  const todo =await Todo.deleteOne({_id:id})

  res.json({
    success:true,
    todo
  })

}
module.exports = {
  getAllProgress,
  createProgress,
  deleteProgress,
  updateProgress
}