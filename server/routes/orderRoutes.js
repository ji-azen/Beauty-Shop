const express = require("express");

const router = express.Router();


const {

    createOrder,

    getMyOrders,

    getAllOrders,

    updateStatus

} = require("../controllers/orderController");



const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");




// ==========================
// CUSTOMER
// ==========================


router.post(

    "/",

    authMiddleware,

    createOrder

);



router.get(

    "/my",

    authMiddleware,

    getMyOrders

);




// ==========================
// ADMIN
// ==========================


router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAllOrders

);



router.put(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    updateStatus

);



module.exports = router;