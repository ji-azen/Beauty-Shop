const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER

exports.register = async(req,res)=>{

    const {
        name,
        email,
        password
    } = req.body;


    if(!name || !email || !password){

        return res.status(400).json({

            success:false,

            message:"Data belum lengkap"

        });

    }


    try{


        const hashPassword = await bcrypt.hash(
            password,
            10
        );


        const sql = `
            INSERT INTO users
            (name,email,password)
            VALUES(?,?,?)
        `;


        db.query(
            sql,
            [
                name,
                email,
                hashPassword
            ],
            (err,result)=>{


                if(err){

                    return res.status(500).json({

                        success:false,

                        message:"Email mungkin sudah digunakan"

                    });

                }



                res.json({

                    success:true,

                    message:"Register berhasil"

                });


            }
        );


    }catch(error){

        res.status(500).json({

            success:false,

            message:"Server error"

        });

    }

};






// LOGIN

exports.login = (req,res)=>{


    const {
        email,
        password
    } = req.body;



    const sql = `
        SELECT *
        FROM users
        WHERE email=?
    `;



    db.query(
        sql,
        [email],
        async(err,result)=>{


            if(err){

                return res.status(500).json({

                    message:"Database error"

                });

            }



            if(result.length===0){

                return res.status(404).json({

                    message:"User tidak ditemukan"

                });

            }



            const user=result[0];



            const match = await bcrypt.compare(
                password,
                user.password
            );



            if(!match){

                return res.status(401).json({

                    message:"Email atau password salah"

                });

            }




            const token = jwt.sign(

                {
                    id:user.id,
                    role:user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:"1d"
                }

            );



            res.json({

                success:true,

                token,

                user:{

                    id:user.id,

                    name:user.name,

                    email:user.email,

                    role:user.role

                }

            });



        }
    );


};