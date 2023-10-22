import React, {useState} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Add = () =>{
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover_picture: "",
        price: null,
        categorie: "",
    })

    const navigate = useNavigate()
    function updateState(prev, e){
        return Object.assign({}, prev, {[e.target.name]: [e.target.value]})
    }
    function handleChange(e) {
        const updatedState = updateState(book, e)
        console.log("UpdateState", updatedState)
        setBook(updatedState)
    };
    async function handleClick(e){
        //refresh our page after click
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    // console.log(book)
    return (
        <div className="form">
            <h1>Add New Books</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="description" onChange={handleChange} name="description"/>
            <input type="text" placeholder="cover_picture" onChange={handleChange} name="cover_picture"/>
            <input type="number" placeholder="price" onChange={handleChange} name="price"/>
            <input type="text" placeholder="categorie" onChange={handleChange} name="categorie"/>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add