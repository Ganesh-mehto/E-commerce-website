import Category from "../models/categoryModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory=asyncHandler(async(req,res)=>{
    try{
        const {name}=req.body
        if (!name) {
            return res.json({error:"name is requried"})
        }
        const existingCategor= await Category.findOne({name})
        if (existingCategor) {
            return res.json({error:"Already exists"})
        }
        const category =await new Category({name}).save()
        res.json(category)
    }
    catch(error){
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory =asyncHandler(async(req,res)=>{
    try{
        const {name}=req.body
        const {categoryId}=req.params
        const category =await Category.findOne({_id:categoryId})
        if (!category) {
            res.json({error:"category not found"})
        }
        category.name=name
        const updatedCategory = await category.save()
        res.json(updatedCategory)

    }
    catch(error){
        console.error(error)
        return res.status(400).json({error:"internal server error"})
    }
})

const removeCategory =asyncHandler(async(req,res)=>{
    try{
        const removed=await Category.findByIdAndRemove(req.params.categoryId)
        res.json(removed)
    }
    catch (error){
        console.error(error)
        return res.status(404).json({error:"internal server error"})
    }
})

const listCategory =asyncHandler(async(req,res)=>{
    try{
        const all =await Category.find({})
        res.json(all)
    }
    catch (error){
        console.error(error)
        return res.status(404).json(error.message)
    }
})

const readCategory =asyncHandler(async(req,res)=>{
    try {
        const category =await Category.findOne({_id:req.params.id})
        res.json(category)
        
    } catch (error) {
        console.error(error)
        return res.status(404).json(error.message)
    }
})
export {createCategory,updateCategory,removeCategory,listCategory,readCategory}