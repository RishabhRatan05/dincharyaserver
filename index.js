const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000
const url = process.env.URL
const profileRoute = require("./routes/profile.js")
const progressRoute = require("./routes/progress.js")
const authRoute = require("./routes/auth.js")

const connectDB = require("./utils/conn.js")
const { checkLoggedInUser } = require("./middlewares/auth.js")
connectDB()

const corsOption = {
  origin: url,
  method: "GET PUT POST DELETE",
}
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use("/", authRoute)
app.use("/api/progress", progressRoute)
app.use("/api/profile", profileRoute)

app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`)
})
