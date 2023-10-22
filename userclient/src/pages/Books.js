import React, {useEffect, useState} from "react"
import axios from "axios";
import {Link} from "react-router-dom";

const Books = () =>{
    const [books, setBooks] = useState([])
    // useEffect это для побочных эффектов(процессов на фоне мб)
    // в нашем слечае это извлечение данных
    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/books")
                // const res = {"title": "AAA", "description": "Bb", "cover_picture": "123.png", "price": 100}
                setBooks(res.data)
                // console.log(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    async function handleDelete(id){
        try{
            await axios.delete("http://localhost:8800/books/"+id)
        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Book Shop</h1>
            <div className="books">
                {books.map(book=>(
                    <div className="book" key={book.id}>
                        {book.cover_picture && <img src={book.cover_picture} alt=""/>}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>${book.price}</span>
                        <button className="delete" onClick={function (){handleDelete(book.id)}}>Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to={"/add"}>Add new book</Link>
            </button>
        </div>
    )
}

export default Books