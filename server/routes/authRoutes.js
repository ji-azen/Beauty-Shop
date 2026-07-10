const express = require("express");

const router = express.Router();


const {
    register,
    login
} = require("../controllers/authController");


const db = require("../config/database");


const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");



router.post(
    "/register",
    register
);



router.post(
    "/login",
    login
);


router.get(
    "/profile",
    authMiddleware,
    (req,res)=>{


        const sql = `
            SELECT 
                id,
                name,
                email,
                role
            FROM users
            WHERE id=?
        `;



        db.query(
            sql,
            [req.user.id],
            (err,result)=>{


                if(err){

                    return res.status(500).json({

                        success:false,

                        message:"Database error"

                    });

                }



                res.json({

                    success:true,

                    data:result[0]

                });



            }
        );



    }
);



router.get(
    "/admin-test",
    authMiddleware,
    adminMiddleware,
    (req,res)=>{


        res.json({

            success:true,

            message:"Halo Admin 👑",

            user:req.user

        });


    }
);





module.exports = router;