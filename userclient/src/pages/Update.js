import React, {useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios"

const Update = () =>{

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
    })

    const navigate = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split("/")[2]

    function updateState(prev, e){
        // return Object.assign({}, prev, {[e.target.name]: [e.target.value]})
        const updatedState =  Object.assign({}, prev)

        if (e.target.value !== ""){
            updatedState[e.target.name] = e.target.value
        }

        return updatedState
    }
    function handleChange(e){
        const UpdateState = updateState(book, e)
        console.log("Update State", UpdateState)
        setBook(UpdateState)
    }

    async function handleClick(e){
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/books/"+bookId, book)
            navigate('/')
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form">
            <h1>Update the Books</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="description" onChange={handleChange} name="description"/>
            <input type="number" placeholder="price" onChange={handleChange} name="price"/>
            <input type="categorie" placeholder="categorie" onChange={handleChange} name="categorie"/>
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update