import express from 'express'
import dotenv from "dotenv";
import connectDB from './src/db/index.js'
import cors from 'cors'
import bcrypt from "bcrypt"
dotenv.config()



const app = express()
app.use(express.json())
// app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get("/encryptPassword", (req,res)=>{

    const planePassword = process.env.PLANE_PASSWORD
    bcrypt.hash(planePassword, 10, function(err, hash) {

      if(err) return res.status(404).json({
        message: 'Internal Server Error',
      })
        res.status(200).json({
          message: 'Password Hashed Successfully',
           hash,
        })
        
        
    });


  })

  app.get("/comparePassword",(req,res)=>{
    const planePassword = process.env.PLANE_PASSWORD
    const hash =  "$2b$10$tn73x9HkaAxBZ3C0TjY6z.uyorfHdQjQaicxOxNbG5S0fYh1ckfFq"

    bcrypt.compare(planePassword, hash, function(err, result) {

      if(err) return res.status(500).json({
        message: 'Internal Server Error',
      })
      
      res.status(200).json({
        isMatch: result,
      })
  });
  })





connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
      });
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!! ", err);
})