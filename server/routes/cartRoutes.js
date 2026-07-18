const express = require("express");

const router = express.Router();


const {
    getCart,
    addCart,
    updateQuantity,
    deleteCart

} = require("../controllers/cartController");

console.log(
    "UPDATE FUNCTION:",
    updateQuantity
);

const authMiddleware = require("../middleware/authMiddleware");



// GET CART
router.get(
    "/",
    authMiddleware,
    getCart
);



// ADD CART
router.post(
    "/",
    authMiddleware,
    addCart
);


// UPDATE QUANTITY
router.put(
    "/:id",
    authMiddleware,
    updateQuantity
);



// DELETE CART
router.delete(
    "/:id",
    authMiddleware,
    deleteCart
);



module.exports = router;