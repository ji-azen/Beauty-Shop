const jwt = require("jsonwebtoken");


function authMiddleware(req,res,next){


    console.log("AUTH CHECK MASUK");


    const authHeader = req.headers.authorization;


    console.log(
        "HEADER:",
        authHeader
    );



    if(!authHeader){

        return res.status(401).json({

            success:false,

            message:"Token tidak ditemukan"

        });

    }



    const token = authHeader.split(" ")[1];



    if(!token){

        return res.status(401).json({

            success:false,

            message:"Token tidak valid"

        });

    }



    try{


        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );



        console.log(
            "USER:",
            decoded
        );



        req.user = decoded;



        console.log(
            "SEBELUM NEXT"
        );


        next();


        console.log(
            "SESUDAH NEXT"
        );


    }

    catch(error){


        console.log(
            "JWT ERROR:",
            error
        );


        return res.status(401).json({

            success:false,

            message:"Token kadaluarsa atau salah"

        });


    }


}



module.exports = authMiddleware;