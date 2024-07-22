import express from "express";

import {auth,authAdmin} from "../midddlwares/auth.js"
import{getAllOrders,getAllOrdersOfUser,addOrder ,deleteOrder,updateOrderStatus}from "../controllers/order.js"

export const routero=express.Router();

routero.get("/",auth,getAllOrders);
routero.get("/:idUser",auth,getAllOrdersOfUser);
routero.post("/",addOrder);
routero.delete("/:idOrder",auth,deleteOrder);
routero.put("/:idOrder",authAdmin,updateOrderStatus);