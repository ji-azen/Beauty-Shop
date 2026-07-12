const db = require("../config/database");


// ==========================
// CUSTOMER BUAT ORDER
// ==========================

function createOrder(req,res){

    const user_id = req.user.id;


    const {
        items,
        payment,
        bank,
        address,
        total
    } = req.body;



    if(
        !items ||
        items.length === 0
    ){

        return res.status(400).json({

            success:false,

            message:"Keranjang kosong"

        });

    }



    const orderSql = `

        INSERT INTO orders

        (
            user_id,
            payment,
            bank,
            address,
            total,
            status
        )

        VALUES(?,?,?,?,?,?)

    `;



    db.query(

        orderSql,

        [
            user_id,
            payment,
            bank,
            address,
            total,
            "Menunggu Pembayaran"
        ],

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Gagal membuat order"

                });

            }



            const orderId = result.insertId;



            const itemValues = items.map(item=>[

                orderId,

                item.id,

                item.qty,

                item.price

            ]);



            const itemSql = `

                INSERT INTO order_items

                (
                    order_id,
                    product_id,
                    qty,
                    price
                )

                VALUES ?

            `;



            db.query(

                itemSql,

                [itemValues],

                (err)=>{


                    if(err){

                        return res.status(500).json({

                            success:false,

                            message:"Gagal menyimpan item"

                        });

                    }



                    res.json({

                        success:true,

                        message:"Pesanan berhasil dibuat",

                        order_id:orderId

                    });



                }

            );



        }

    );

}



// ==========================
// CUSTOMER LIHAT ORDER SENDIRI
// ==========================

function getMyOrders(req,res){


    const user_id = req.user.id;



    const sql = `

        SELECT *

        FROM orders

        WHERE user_id=?

        ORDER BY id DESC

    `;



    db.query(

        sql,

        [user_id],

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Gagal mengambil pesanan"

                });

            }



            res.json({

                success:true,

                data:result

            });



        }

    );

}



// ==========================
// ADMIN LIHAT SEMUA ORDER
// ==========================

function getAllOrders(req,res){



    const sql = `

        SELECT

        orders.*,

        users.name,

        users.email


        FROM orders


        JOIN users

        ON orders.user_id = users.id


        ORDER BY orders.id DESC

    `;



    db.query(

        sql,

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Gagal mengambil data order"

                });

            }



            res.json({

                success:true,

                data:result

            });



        }

    );


}



// ==========================
// ADMIN UPDATE STATUS ORDER
// ==========================

function updateStatus(req,res){


    const { id } = req.params;


    const { status } = req.body;



    if(!status){

        return res.status(400).json({

            success:false,

            message:"Status wajib diisi"

        });

    }



    const sql = `

        UPDATE orders

        SET status=?

        WHERE id=?

    `;



    db.query(

        sql,

        [
            status,
            id
        ],

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Gagal update status"

                });

            }



            res.json({

                success:true,

                message:"Status berhasil diperbarui"

            });



        }

    );


}




module.exports = {

    createOrder,

    getMyOrders,

    getAllOrders,

    updateStatus

};