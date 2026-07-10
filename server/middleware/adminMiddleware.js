function adminMiddleware(req,res,next){


    if(!req.user){


        return res.status(401).json({

            success:false,

            message:"User belum login"

        });


    }



    if(req.user.role !== "admin"){


        return res.status(403).json({

            success:false,

            message:"Akses admin ditolak"

        });


    }



    next();


}


module.exports = adminMiddleware;