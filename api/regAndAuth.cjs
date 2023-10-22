const express = require("express")
const mysql = require("mysql")
const path = require("path")
const {errorFunc} = require("express-fileupload/lib/utilities.js");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database:"ReactWebSite"
})

const router = express.Router()

router.post('/registration', function(req, res){

    const q = "insert into user (`nameUser`, `email`, `password`) values (?)"
    const values = [
        req.body.nameUser,
        req.body.email,
        req.body.password
    ]

    db.query(q, [values], function (err, data){
        if (err) return res.json(err)
        return res.json("User added!")
    })
})

router.post('/authorization', function (req, res){
    const q = "select `nameUser`, `email`, `password` from user where email=?"
    values = [req.body.emailAuth]

    db.query(q, [values], function (err, data){
        if (err) {
            console.error("Database error:", err);
            return res.json("Authorization error");
        }
        // Проверяем, вернул ли запрос результаты и сравниваем пароль
        if (data.length > 0 && data[0].password === req.body.passwordAuth[0]) {
            // return res.json("Authorization passed!");
            return res.json([data[0].nameUser])
        } else {
            return res.json("Authorization error");
        }
    })
})

module.exports = router