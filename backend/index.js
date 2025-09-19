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
const Product  = require("./schema/product");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads/images"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


// Api to Create product
app.post("/addproduct", async(req, res)=>{
    const products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1
    }else{
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,

    })
});


// Creating API For Delete
app.post("/removeproduct", async (req, res)=> {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
});

// Creating Api For Getting All Product
app.get("/allproduct", async(req, res)=> {
    let products = await Product.find({});
    console.log("all product fetched");
    res.send(products);
})

app.listen(port, (error)=> {     
    if (!error) {
       console.log(`Connection sucesfuly on ${port}`)  
    }else{
        console.log("error: "+error)
    }
})




