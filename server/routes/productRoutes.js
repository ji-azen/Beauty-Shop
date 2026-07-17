const express = require("express");

const router = express.Router();

const {

    getProducts,

    getProductById,

    createProduct,

    updateProduct,

    deleteProduct

} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");



// ==========================
// GET ALL PRODUCTS
// ==========================

router.get(

    "/",

    getProducts

);



// ==========================
// GET PRODUCT BY ID
// ==========================

router.get(

    "/:id",

    getProductById

);



// ==========================
// CREATE PRODUCT
// ==========================

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    upload.single("image"),

    createProduct

);



// ==========================
// UPDATE PRODUCT
// ==========================

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    upload.single("image"),

    updateProduct

);



// ==========================
// DELETE PRODUCT
// ==========================

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteProduct

);



module.exports = router;