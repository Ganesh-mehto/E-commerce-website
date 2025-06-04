import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

 const addProduct = asyncHandler(async (req, res) => {
    const { name,brand, description, price, category,quantity,image } = req.fields;
    
    switch (true) {
        case !name:
            console.error("Product name is required.");
        case !brand:
            console.error("Product brand is required.");
        case !description:
            console.error("Product description is required.");
        case !price:
            console.error("Product price is required.");
        case !category:
            console.error("Product category is required.");
        case !quantity:
            console.error("Product quantity is required.");
        case !image:
            console.error("Product image is required.");
        default:
            break;
    }
    
    const newProduct = new Product({
        name,
        description,
        price,
        brand,
        quantity,
        category,
        image,
    });
    
    try {
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid product data");
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, description, price, category, quantity, image } = req.fields;

        const product = await Product.findById(id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.quantity = quantity || product.quantity;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400);
        throw new Error("Failed to update product details");
    }
})

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        await product.deleteOne();
        res.json({ message: "Product removed successfully" });
    } catch (error) {
        res.status(400);
        throw new Error("Failed to remove product");
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize =6;
        const keywords = req.query.keywords
            ? {
                name: {
                    $regex: req.query.keywords,
                    $options: "i",
                },
            }
            : {};
        const count = await Product.countDocuments({ ...keywords });
        const products = await Product.find({ ...keywords })
            .limit(pageSize);  
        
        res.json({products,page:1, pages: Math.ceil(count / pageSize),hasMore:false,});
    } catch (error) {
        res.status(400);
        throw new Error("Failed to fetch products");
    }
})
export { addProduct,updateProductDetails,removeProduct, fetchProducts };