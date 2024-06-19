// define port
const port = 4000;
// import express
const express = require("express");
// create app instance
const app = express();
// initialize mongoose package
const mongoose = require ("mongoose")
// initialize jsonwebtoken package
const jwt = require ("jsonwebtoken")
// initialize multer package
const multer = require ("multer")
// initialize path package from express server
const path = require ("path")
// initialize cors package
const cors = require ("cors");

// middleware to parse json bodies
app.use(express.json());
// middleware to enable cors
app.use(cors());

// connect to mongodb
mongoose.connect("mongodb+srv://aliemhejosemaria:124698763Jayhood@cluster0.80zvetz.mongodb.net/e-commerce")
.then(()=>{
    console.log("successfully connected to the database")
})
// API Creation

app.get("/", (req,res)=>{
    res.send("Express app is running")
})

// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    all_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default: true,
    },
})





// listen for requests
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})





