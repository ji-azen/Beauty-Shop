const express = require("express");

const router = express.Router();


const {
    createOrder,
    getMyOrders,
    getAllOrders
} = require("../controllers/orderController");


const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");





// ==========================
// CUSTOMER
// ==========================


// buat pesanan

router.post(
    "/",
    authMiddleware,
    createOrder
);




// lihat pesanan sendiri

router.get(
    "/my",
    authMiddleware,
    getMyOrders
);








// ==========================
// ADMIN
// ==========================


// lihat semua order

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);






module.exports = router;