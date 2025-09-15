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
app.use("/images", express.static("uploads/images"))

// Database Connection With MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASWORD}@cluster0.1fb4jph.mongodb.net/e-commerce`)
.then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
// mongoose.connect("mongodb+srv://olehfidelis:360940@cluster0.1fb4jph.mongodb.net/e-commerce");

app.get("/", (req, res)=>{
    res.send("Express App Is Running")
})


const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename:(req, file, cb)=>{
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({storage: storage});



// Creating Upload Endpoint For Images

app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: 0,
            message: "No file uploaded. Make sure the field name is 'product'."
        });
    }

    res.json({
        success: 1,
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


// app.post("/upload", upload.single("product"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({
//             success: 0,
//             message: "No file uploaded. Make sure the field name is 'product'."
//         });
//     }

//     res.json({
//         success: 1,
//         img_url: `http://localhost:${port}/images/${req.file.filename}`
//     });
// });



app.listen(port, (error)=> {     
    if (!error) {
       console.log(`Connection sucesfuly on ${port}`)  
    }else{
        console.log("error: "+error)
    }
})




