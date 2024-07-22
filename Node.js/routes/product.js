import express from "express";
import {authAdmin} from "../midddlwares/auth.js";
import {getAllProduct,getProductById,addProduct,deleteProductById,updateProduct} 
from "../controllers/product.js";

export const routerp=express.Router();
routerp.get("/",getAllProduct);
routerp.get("/:idProduct",getProductById);
routerp.post("/",addProduct);
// routerp.post("/",authAdmin,addProduct);
// routerp.delete("/:idProduct",authAdmin,deleteProductById)
routerp.delete("/:idProduct",authAdmin,deleteProductById)
routerp.put("/:idProduct",authAdmin,updateProduct);