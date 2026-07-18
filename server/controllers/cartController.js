const db = require("../config/database");

console.log("CART CONTROLLER LOADED");


// =========================
// GET CART
// =========================

function getCart(req, res) {


    const userId = req.user.id;


    const sql = `

        SELECT

            carts.id,

            carts.quantity,

            products.id AS product_id,

            products.name,

            products.brand,

            products.price,

            products.image,

            products.stock


        FROM carts


        INNER JOIN products

        ON carts.product_id = products.id


        WHERE carts.user_id = ?


        ORDER BY carts.id DESC

    `;



    db.query(

        sql,

        [userId],

        (err,result)=>{


            if(err){

                console.log(
                    "GET CART ERROR:",
                    err
                );


                return res.status(500).json({

                    success:false,

                    message:"Gagal mengambil cart"

                });

            }



            res.json({

                success:true,

                total:result.length,

                data:result

            });



        }

    );


}





// =========================
// ADD CART
// =========================

function addCart(req,res){


    const userId = req.user.id;


    const {

        product_id,

        quantity

    } = req.body;



    console.log(
        "ADD CART:",
        userId,
        product_id,
        quantity
    );



    if(!product_id || !quantity){


        return res.status(400).json({

            success:false,

            message:"Data belum lengkap"

        });

    }




    const checkSql = `

        SELECT *

        FROM carts

        WHERE user_id = ?

        AND product_id = ?

    `;



    db.query(

        checkSql,

        [

            userId,

            product_id

        ],

        (err,result)=>{


            if(err){

                console.log(err);


                return res.status(500).json({

                    success:false,

                    message:"Database error"

                });

            }





            if(result.length > 0){


                const updateSql = `

                    UPDATE carts

                    SET quantity = quantity + ?

                    WHERE user_id = ?

                    AND product_id = ?

                `;



                db.query(

                    updateSql,

                    [

                        quantity,

                        userId,

                        product_id

                    ],

                    (err)=>{


                        if(err){

                            console.log(err);


                            return res.status(500).json({

                                success:false,

                                message:"Gagal update cart"

                            });

                        }



                        res.json({

                            success:true,

                            message:"Jumlah cart diperbarui"

                        });


                    }

                );

            }



            else{


                const insertSql = `

                    INSERT INTO carts

                    (

                        user_id,

                        product_id,

                        quantity

                    )

                    VALUES(?,?,?)

                `;



                db.query(

                    insertSql,

                    [

                        userId,

                        product_id,

                        quantity

                    ],

                    (err,result)=>{


                        if(err){

                            console.log(err);


                            return res.status(500).json({

                                success:false,

                                message:"Gagal tambah cart"

                            });

                        }




                        res.status(201).json({

                            success:true,

                            message:"Produk masuk keranjang",

                            id:result.insertId

                        });


                    }

                );


            }


        }

    );


}






// =========================
// UPDATE QUANTITY
// =========================

function updateQuantity(req,res){


    console.log(
        "UPDATE CART CONTROLLER MASUK"
    );



    const userId = req.user.id;


    const id = req.params.id;


    const quantity = req.body.quantity;



    console.log({

        cartId:id,

        userId,

        quantity

    });





    if(!quantity || quantity < 1){


        return res.status(400).json({

            success:false,

            message:"Quantity minimal 1"

        });

    }




    const sql = `

        UPDATE carts

        SET quantity = ?

        WHERE id = ?

        AND user_id = ?

    `;




    db.query(

        sql,

        [

            quantity,

            id,

            userId

        ],

        (err,result)=>{


            if(err){

                console.log(

                    "UPDATE ERROR:",

                    err

                );


                return res.status(500).json({

                    success:false,

                    message:"Gagal update quantity"

                });

            }




            console.log(
                "UPDATE RESULT:",
                result
            );





            if(result.affectedRows === 0){


                return res.status(404).json({

                    success:false,

                    message:"Cart tidak ditemukan"

                });

            }





            res.json({

                success:true,

                message:"Quantity berhasil diupdate"

            });



        }

    );


}






// =========================
// DELETE CART
// =========================

function deleteCart(req,res){



    const userId = req.user.id;


    const id = req.params.id;



    const sql = `

        DELETE FROM carts

        WHERE id = ?

        AND user_id = ?

    `;



    db.query(

        sql,

        [

            id,

            userId

        ],

        (err,result)=>{


            if(err){

                console.log(err);


                return res.status(500).json({

                    success:false,

                    message:"Gagal hapus cart"

                });

            }




            if(result.affectedRows === 0){


                return res.status(404).json({

                    success:false,

                    message:"Cart tidak ditemukan"

                });

            }




            res.json({

                success:true,

                message:"Produk dihapus"

            });


        }

    );


}






module.exports = {

    getCart,

    addCart,

    updateQuantity,

    deleteCart

};