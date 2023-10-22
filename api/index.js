import express, {Router} from "express"
import mysql from "mysql"
import cors from "cors"
import p from "./profile.cjs"
import ra from "./regAndAuth.cjs"
import fileUpload from "express-fileupload";
import path from "path";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database:"ReactWebSite"
})

app.use(express.json())
app.use(cors())

app.get("/", function (req, res){
    res.json("hello this is the backend!")
})

app.get("/books", (req, res)=>{
    const query = "select * from books;"
    db.query(query, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})
// когда клиент отправить post запрос на .../books то выполниться этот метод
app.post("/books", function (req, res){
    const q = "insert into books (`title`, `description`, `cover_picture`, `price`, `categorie`)" +
        "values (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover_picture,
        req.body.price,
        req.body.categorie
    ];

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Book has been create successfully!")
    })
})

app.delete("/books/:id", function(req, res){
    const bookId = req.params.id;
    const q = "delete from books where id=?";

    db.query(q, [bookId], function(err, data){
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", function(req, res){
    const bookId = req.params.id
    const q = "update books set `title`=?, `description`=?, `price`=?, `categorie`=? where id=?"

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.categorie
    ]
    const params = values.concat(bookId);
    console.log("Params", params)
    // либо можно было сделать через оператор распространения [...values, bookId]
    db.query(q, params, function(err, data){
        if(err) return res.json(err)
        return res.json("Book has been updated successfully!")
    })
})

app.get("/books/:id", function(req, res){
    const bookId = req.params.id
    const q = "select * from books where id=?;"

    db.query(q, bookId, function (err, data){
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.use('/profile', p)
app.use('/', ra)

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
