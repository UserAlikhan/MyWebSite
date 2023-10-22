import React from 'react';
import "./main.css"

function Main () {
    return (
        <div>
            <div className="leftMenu">
                <input
                    type="text"
                    className="search"
                    placeholder="Введите что-то..."
                    name="searchBar"
                />
                <h1>Каталог</h1>
                <div className="cats">
                    <span className="cat">Tech</span>
                    <span className="cat">Econom</span>
                    <span className="cat">Art</span>
                </div>
                <h1>Настройка по цене</h1>
                <div className="price">
                    <input type="range" className="priceRange" />
                    <span className="priceValue">$ Деньга</span>
                </div>
            </div>
            <div className="content">
                <div className="products">

                </div>
            </div>
            <script src="../BookShow.jsx"></script>
        </div>
    )
}

export default Main;
