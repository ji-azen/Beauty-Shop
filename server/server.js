require("dotenv").config();

const express = require("express");
const cors = require("cors");


// DATABASE CONNECT
require("./config/database");


// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");



const app = express();



// ==========================
// MIDDLEWARE
// ==========================


// izinkan frontend React
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);



// baca JSON dari Thunder Client / React
app.use(
    express.json()
);



// baca form data
app.use(
    express.urlencoded({
        extended:true
    })
);




// debug body (sementara)
// hapus nanti kalau sudah selesai testing
app.use(
    (req,res,next)=>{

        console.log(
            req.method,
            req.url
        );

        console.log(
            "BODY:",
            req.body
        );

        next();

    }
);






// ==========================
// TEST
// ==========================


app.get(
    "/",
    (req,res)=>{

        res.json({

            success:true,

            message:"Beauty Store API Running 🚀"

        });

    }
);






// ==========================
// ROUTES
// ==========================


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);






// ==========================
// ERROR 404
// ==========================


app.use(
    (req,res)=>{

        res.status(404).json({

            success:false,

            message:"Endpoint tidak ditemukan"

        });

    }
);






// ==========================
// SERVER START
// ==========================


const PORT = process.env.PORT || 5000;



app.listen(
    PORT,
    ()=>{

        console.log("==============================");

        console.log("🚀 Beauty Store Backend Aktif");

        console.log(
            `🌐 Server: http://localhost:${PORT}`
        );

        console.log("==============================");

    }
);