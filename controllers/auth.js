const bcrypt = require("bcryptjs")

const User = require("../models/profile")

const loginUser =async (req,res)=>{
    try {
        const { email, password } = req.body
        if (!email || !password) res.status(401).json({ message: "Enter all fields" })

        const user = await User.find({ email: email })
        if (!user) res.status(401).json({ message: "Incorrect Credentials" })
        const userPassword = user[0].password

        const isVerified = await bcrypt.compare(
          password,
          userPassword,
        )
        if (!isVerified) res.json({ message: "Incorrect Credentials" })

        res.status(200).json({
          message: "Login Successful",
          user,
        })
    } catch (error) {
        console.error(error)
    }

}

const signUpUser =async (req, res)=>{
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
    signUpUser,
    loginUser
}