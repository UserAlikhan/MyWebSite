import React, { useEffect, useState } from "react";
import axios from "axios";
import "./layouts/main.css"
import {Link, useLocation} from "react-router-dom";

function ShowBooks() {
    const [books, setBooks] = useState([]);
    let [inputText, setInputText] = useState([]);

    const location = useLocation()
    const { state } = location
    const values = state && state.val



    useEffect(() => {
        async function fetchAllBooks() {
            try {
                const res = await axios.get("http://localhost:8800/books");
                console.log(res)
                setBooks(res.data)
                setInputText(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, []);

    async function handleDelete(id){
        try {
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)
        }
    }
    function filterProductElements(books){
        return books.map(function (book, index) {
            // console.log("ID", book.title)
            return (
                <div className="product" key={index}>
                    <img src={book.cover_picture} alt="" />
                    <span className="name">
                        <Link to={`/moreAboutBook/${book.id}`}>
                            {book.title}
                        </Link>
                    </span>
                    <span className="priceText">{book.price}$</span>
                    <div>
                        <button className="delete" onClick={function (){handleDelete(book.id)}}>Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                </div>
            )
        })
    }
    console.log("ЭТО ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: ", values)
    function handleInputChange(e){
        const searchInput = document.querySelector(".search")

        searchInput.addEventListener("keyup", function (e){
            const value = e.target.value.toLowerCase()

            if (value){
                // filter - работает как цикл переберает все значение и где оно подходит условию возвращаем
                setInputText(books.filter(function (item){
                    return item.title.toLowerCase().indexOf(value) !== -1
                }))


            }else{
                setInputText(books)
                console.log("I",inputText)
            }
        })
    }

    function setCategories(){

        const allCats = books.map(function(book){
            return book.categorie
        })

        const filteredCategories = [
            // оператор распростанения, присваеваем All в начало массива
            "All",
            ...allCats.filter(function (item, index){
                return allCats.indexOf(item) === index
            })
        ]

        return filteredCategories
    }
    function handleCatClick(){

        const categoriesContainer = document.querySelector(".cats")

        categoriesContainer.addEventListener("click", function (e){
            console.log("CLICK!")
            const selectedCat = e.target.textContent
            console.log(selectedCat)

            if (selectedCat === "All"){
                setInputText(books)
            }
            else{
                setInputText(books.filter(function (item){
                    return item.categorie === selectedCat
                }))
            }
        })
    }
    function ComponentPrice() {

        const priceValue= document.querySelector(".priceValue")

        const priceList = books.map(function(book){
            return Math.round(book.price)
        })

        const minPrice = Math.min.apply(null, priceList)
        const maxPrice = Math.max(...priceList);
        const [sliderVal, setSliderVal] = useState(maxPrice)

        const handlePriceRangeChange = (event) => {
            const newValue = parseInt(event.target.value, 10)

            priceValue.textContent = "$" + event.target.value
            setInputText(books.filter(function (item){
                return item.price <= event.target.value
            }))
            setSliderVal(newValue);
        };
        return (
            <div>
                <input
                    type="range"
                    className="priceRange"
                    min={minPrice}
                    max={maxPrice}
                    value={sliderVal}
                    onChange={handlePriceRangeChange}
                />
                <span className="priceValue">${sliderVal}</span>
            </div>
        );
    }

    return (
        <div>
            <div className="NavBar">
                <nav>
                    <label className="logo">E-Book Reader</label>
                    {values !== null ? (
                        <ul>
                            <li>Your nickname: {values[0]}</li>
                            <li><a className="ChangeAcc" href="/authorization">Change Account</a></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><a href="/registration">Registration</a></li>
                            <li><a href="/authorization">Authorization</a></li>
                        </ul>
                    )}
                </nav>
            </div>
            <div className="container">
                <div className="leftMenu">
                    <input
                        type="text"
                        className="search"
                        placeholder="Введите что-то..."
                        onChange={handleInputChange}
                        name="searchBar"
                    />
                    <h1>Каталог</h1>
                    <div className="cats">
                        {setCategories().map((cat, index) => (
                            <span className="cat" key={index} onClick={handleCatClick}>
                                {cat}
                            </span>
                        ))}
                    </div>
                    <h1>Настройка по цене</h1>

                    {ComponentPrice()}

                    <a href="/add"><button className="image-button"></button></a>
                </div>
                <div className="content">
                    <div className="products">
                        {filterProductElements(inputText)}
                    </div>
                </div>
                <script src="../BookShow.js"></script>
            </div>
        </div>
    );
}

export default ShowBooks;