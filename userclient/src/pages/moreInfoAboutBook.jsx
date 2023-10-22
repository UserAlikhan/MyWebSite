import React, {createRef, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import "./layouts/styleAboutPage.css"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import path from "path"

function MoreAboutBookPage(){
    const [books, setBooks] = useState([])

    const location = useLocation()
    const bookId = location.pathname.split("/")[2]

    const [file, setFile] = useState([]);
    const fileInput = createRef()


    console.log(bookId)

    useEffect(function(){
        async function fetchBookById(){
            try{
                const res = await axios.get(`http://localhost:8800/books/${bookId}`)
                setBooks(res.data)

            }catch (err){
                console.log(err)
            }
        }
        fetchBookById()
    }, [])

    function onChangeFile(e){

        if (e.target.files && e.target.files.length > 0){
            setFile([e.target.files[0]])
        }
    }
    async function onSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        // set key-value pair
        formData.set("avatar", fileInput.current.files[0])
        formData.append("id", bookId)
        try{
            const response = await fetch('http://localhost:8800/profile', {
                method: "POST",
                body: formData
            })
            // const res = await axios.get('http://localhost:8800/profile')
            // console.log("Res Data", res.data)

            const parsedResponse = await response.json()
            if (response.ok){
                alert("File uploaded")
            }else{
                console.error("Some error occurred")
            }
        }catch (err){
            console.error(err.message)
        }
    }

    function createFile(absolutePath){
        absolutePath = books.map(function(book){
            return book.book_dir
        })

        const pathParts = absolutePath[0].split(/[\\\/]/);

        const fileName = pathParts[pathParts.length - 1];

        return fileName
    }

    function PlaceData(){

        let a = books.map(function (book){
            return (
                <div>
                    <div className="App">
                        <div className="product-image">
                            <img src={book.cover_picture} alt="Product Image"/>
                        </div>
                        <div className="product-details">
                            <div className="product-title">{book.title}</div>
                            <div className="product-price">Цена: ${book.price}</div>
                            <div className="product-description">
                                <h3>Описание книги</h3>
                                <div className="desc">{book.description}</div>
                            </div>
                            <div className="product-specs">
                                <h4>Детали продукта:</h4>
                                <span>Название: {book.title}</span>
                                <span>Жанр: {book.categorie}</span>
                                <span>Цена: {book.price}</span>
                            </div>
                        </div>

                    </div>
                    <div className="pdfContainer">
                        <h2>View PDF</h2>

                        {book.book_dir ? (
                            <div className="pdf-cont">
                                <div className="viewFile">
                                    <DocViewer
                                        documents={[
                                            {
                                                uri: require(`../filesToLoad/${createFile(book.book_dir)}`), // Путь к файлу в формате URI
                                                fileType: 'pdf',
                                                fileName: 'myFile.pdf'
                                            }
                                        ]}
                                        style={{width: 1000, height: 1000}}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="pdf-cont">
                                <div className="inputFile">
                                    <form onSubmit={onSubmit}>
                                        <input
                                            type="file"
                                            name="avatar"
                                            ref={fileInput}
                                            accept=".pdf"
                                            onChange={onChangeFile}
                                        />
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                                <div className="viewFile">
                                    <DocViewer
                                        documents={file.map((f) => ({
                                            uri: window.URL.createObjectURL(f),
                                            // uri: require(f),
                                            fileName: f.name,
                                        }))}
                                        pluginRenderers={DocViewerRenderers}
                                        style={{width: 1000, height: 1000}}
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            )
        })
        return a
    }

    return (
        PlaceData()
    )
}

export default MoreAboutBookPage