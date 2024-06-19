const bcrypt = require("bcryptjs")

const User = require("../models/profile")

const loginUser =async (req,res)=>{
    try {
        const { email, password } = req.body
        if (!email || !password) res.json({ message: "Enter all fields" })

        const user = await User.find({ email: email })
        if (!user) res.json({ message: "Incorrect Credentials" })
        const userPassword = user[0].password

        const isVerified = await bcrypt.compare(
          password,
          userPassword,
        )
        if (!isVerified) res.json({ message: "Incorrect Credentials" })

        res.json({
          message: "Login Successful",
          user,
        })
    } catch (error) {
        console.error(error)
    }

}

const signInUser =async (req, res)=>{
    const { name, email, password } = req.body
    if(!name || !email || !password) throw new Error({"message":"Enter all fields"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user =await  User.create({ name, email, password:hashedPassword })

    res.status(202).json({
        message: "Sign In Successfull",
        user
    })
}

module.exports ={
    signInUser,
    loginUser
}