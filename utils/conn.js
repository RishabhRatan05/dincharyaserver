const mongoose = require('mongoose')



const connectDB = async()=>{

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'dincharya'
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB