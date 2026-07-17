const db = require("../config/database");

// =========================
// GET ALL PRODUCTS
// =========================
function getProducts(req, res) {

    const sql = `

        SELECT

        products.*,

        categories.name AS category

        FROM products

        LEFT JOIN categories

        ON products.category_id = categories.id

        ORDER BY products.id DESC

    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: "Gagal mengambil produk"

            });

        }

        res.json({

            success: true,

            total: result.length,

            data: result

        });

    });

}

// =========================
// GET PRODUCT BY ID
// =========================
function getProductById(req, res) {

    const { id } = req.params;

    const sql = `

        SELECT

        products.*,

        categories.name AS category

        FROM products

        LEFT JOIN categories

        ON products.category_id = categories.id

        WHERE products.id = ?

    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: "Database error"

            });

        }

        if (result.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Produk tidak ditemukan"

            });

        }

        res.json({

            success: true,

            data: result[0]

        });

    });

}

// =========================
// CREATE PRODUCT
// =========================
function createProduct(req, res) {

    const {

        category_id,

        brand,

        name,

        description,

        price,

        stock,

        image

    } = req.body;

    if (

        !brand ||

        !name ||

        !price ||

        !stock

    ) {

        return res.status(400).json({

            success: false,

            message: "Data produk belum lengkap"

        });

    }

    const sql = `

        INSERT INTO products

        (

            category_id,

            brand,

            name,

            description,

            price,

            stock,

            image

        )

        VALUES (?,?,?,?,?,?,?)

    `;

    db.query(

        sql,

        [

            category_id || null,

            brand,

            name,

            description || "",

            price,

            stock,

            image || ""

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,

                    message: "Gagal menambah produk"

                });

            }

            res.status(201).json({

                success: true,

                message: "Produk berhasil ditambahkan",

                id: result.insertId

            });

        }

    );

}

// =========================
// UPDATE PRODUCT
// =========================
function updateProduct(req, res) {

    const { id } = req.params;

    const {

        category_id,

        brand,

        name,

        description,

        price,

        stock,

        image

    } = req.body;

    const sql = `

        UPDATE products

        SET

        category_id = ?,

        brand = ?,

        name = ?,

        description = ?,

        price = ?,

        stock = ?,

        image = ?

        WHERE id = ?

    `;

    db.query(

        sql,

        [

            category_id || null,

            brand,

            name,

            description || "",

            price,

            stock,

            image || "",

            id

        ],

        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: "Gagal update produk"

                });

            }

            res.json({

                success: true,

                message: "Produk berhasil diupdate"

            });

        }

    );

}

// =========================
// DELETE PRODUCT
// =========================
function deleteProduct(req, res) {

    const { id } = req.params;

    const sql = `

        DELETE FROM products

        WHERE id = ?

    `;

    db.query(sql, [id], (err) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: "Gagal hapus produk"

            });

        }

        res.json({

            success: true,

            message: "Produk berhasil dihapus"

        });

    });

}

module.exports = {

    getProducts,

    getProductById,

    createProduct,

    updateProduct,

    deleteProduct

};