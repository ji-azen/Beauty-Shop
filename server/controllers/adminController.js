const db = require("../config/database");

function getDashboard(req, res) {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM users) AS totalUsers,
            (SELECT COUNT(*) FROM products) AS totalProducts,
            (SELECT COUNT(*) FROM orders) AS totalOrders,
            (SELECT COALESCE(SUM(total),0) FROM orders) AS totalRevenue
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: "Gagal mengambil dashboard"

            });

        }

        res.json({

            success: true,

            data: result[0]

        });

    });

}

module.exports = {

    getDashboard

};