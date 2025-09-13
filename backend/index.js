const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();


const path =  require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASWORD}@cluster0.1fb4jph.mongodb.net/e-commerce`);
// mongoose.connect("mongodb+srv://olehfidelis:360940@cluster0.1fb4jph.mongodb.net/e-commerce");

app.get("/", (req, res)=>{
    res.send("Express App Is Running")
})

app.listen(port, (error)=> {
    if (!error) {
      console.log(`Connection sucesfuly on ${port}`)  
    }else{
        console.log("error: "+error)
    }
})