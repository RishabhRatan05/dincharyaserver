const mongoose = require('mongoose')



const connectDB = async()=>{

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'dincharya'
        })
        console.log(`server connected at`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB