import mongoose  from "mongoose";

const productSchema=mongoose.Schema({
    productName:{type:String,default:'a'},
    seats:{type:String,default:'a'},
    suitcases:{type:String,default:'a'},
    bags:{type:String,default:'a'},
    imgUrl:{type:String,default:'a'},
    price:{type:Number,default:100},
    type:{type:String,default:'b'},
    category:{type:String,default:'a'}, 
})

export const ProductModel=mongoose.model("produts",productSchema);