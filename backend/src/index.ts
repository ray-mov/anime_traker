import express from "express"
import 'dotenv/config'
import { connectDB } from "./configs/db.js"

const app = express()
const port = process.env.PORT || 3000

//middleware

app.use(express.json())

app.get('/', (req, res) => {
   res.send("MongoDB Compass connection successful 🚀");
})

connectDB().then( () => {
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})


