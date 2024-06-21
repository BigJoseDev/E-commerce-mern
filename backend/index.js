// define port
const port = 4000;
// initialize env package
require("dotenv").config();
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
const { log } = require("console");

// middleware to parse json bodies
app.use(express.json());
// middleware to enable cors
app.use(cors());

// connect to mongodb

mongoose.connect(process.env.MONGO_URI)
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

const Product = mongoose.model("product",{
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
    old_price:{
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


app.post('/addproduct', async (req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
       
    });
    console.log(product);
    await product.save() 
    console.log("Product added successfully")
    res.json({
        success: true,
        name: req.body.name,
    })
})

// create Api for deleting product

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Product removed successfully");
    res.json({
        success: true,
        name: req.body.name
    })

})

// Api for getting all products
app.get('/allproducts', async (req,res)=>{
let products = await Product.find({})
console.log("all products fetched successfully")
res.send(products);
})



// listen for requests
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})





