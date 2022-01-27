import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js';



// @desc Get all products
// @route GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})



// @desc Get single product
// @route GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.json(product);
    }else {
        res.status(404);
        throw new Error("Product not found");
    }
})


// @desc Delete a product
// @route DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    
    if(product) {
        await product.remove()
        res.status(200).json({message: "Product deleted"});
    }else {
        res.status(404);
        throw new Error("Product not found");
    }
})

// @desc Create a product
// @route POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user.id,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        reviews: req.body.reviews,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        price: req.body.price,
        countInStock: req.body.countInStock,
    });
   const createdProduct = await product.save()
   res.status(201).json(createdProduct);
})


// @desc Update a product
// @route PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image 
        product.brand = brand 
        product.category = category
        product.countInStock = countInStock 

        const updateProduct = await product.save()
        res.status(201).json(updateProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }

})


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}