const express = require("express");

const router = express.Router();

const {
    getDashboard
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

router.get(

    "/dashboard",

    authMiddleware,

    adminMiddleware,

    getDashboard

);

module.exports = router;