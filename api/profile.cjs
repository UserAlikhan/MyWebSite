const express = require("express");
const fileUpload = require("express-fileupload");
const path = require('path')
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database:"ReactWebSite"
})

const assetsFolder = path.join("C:/Users/huitd/WebstormProjects/untitled/userclient/src", "filesToLoad")

const router = express.Router()
router.use(fileUpload())

router.post('/', function (req, res){
    const q = "update books set `book_dir`=? where id=?"

    const {avatar} = req.files
    avatar.mv(path.join(assetsFolder, avatar.name))

    const params = [path.join(assetsFolder, avatar.name), req.body.id]
    console.log(params)
    db.query(q, params, function (err, data){
        if (err) return res.json(err)
        return;
    })

    res.status(200).json({ message: 'ok'})
})

module.exports = router;