import React from "react";
import "../Store/Store.css";
import Card from "../Card/Card";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Store.css"
import { useState } from "react";

const { getData } = require("../../db/db");

function Store({ edit_filters, sneaker, onAdd, onRemove, cartItems }) {

    const [sneakers, setSneakers] = useState(sneaker)

    // const [minprice, setMinprice] = useState("")
    // const [maxprice, setMaxprice] = useState("")
    // // const [brand, setBrand] = useState("")
    // // const [gender, setGender] = useState("")
    // // const [sizes, setSizes] = useState([])
    // // const [groups, setgroups] = useState([])

    function filters() {
        let min_price = document.getElementById("min_price").value
        let max_price = document.getElementById("max_price").value
        let m = document.getElementById("checkM").checked
        let w = document.getElementById("checkW").checked
        let gender = ""
        if (m == 1 && w == 1) {
            gender = "U"
        }
        else if (m == 1) {
            gender = "M"    
        }
        else if (w == 1) {
            gender = "W"
        }
        else {
            gender = ""
        }
        setSneakers(getData(min_price, max_price, gender))
    }

    function cancel_filters() {
        let min_price = ""
        let max_price = ""
        let gender = ""
        setSneakers(getData(min_price, max_price, gender))
    }

    function inBracket(id) {
        if (cartItems.lenght === 0) {
            return 0
        }
        else {
            for(var i = 0; i < cartItems.lenght; i++){
                if (cartItems[i].id === id){
                    return cartItems[i].quantity
                }
            }
        return 0  
        }
    }
    console.log(sneakers)
    return (

        <>
            <Carousel variant="dark" indicators={false} interval={null}>
                {sneakers.map((sneakers) => {
                    return (
                        <Carousel.Item key={sneakers.id}>

                            <img
                            className="d-block"
                            width={'100%'}
                            // height={'100%'}
                            src={sneakers['Image']}

                            alt="First slide"
                            />
                            <div className="carouselItem">
                            
                            <div className="textInCarousel">
                            {sneakers['title']}
                            <br/>
                            ₽{sneakers['price']}   
                            </div>
                            <div className="buttonCarouselSection">
                                <Link to={`/store/${sneakers.id}`}>
                                    <button className='buttonCarousel'>Купить</button>
                                </Link>    
                            </div>
                        </div>
                        </Carousel.Item>
                    );
                    }
                    )
                }
                </Carousel>
            <div className="preItemsBlock">
                <div className="textInBlock">
                    Товары
                </div>
            </div>


            <input className="form-control" type="text" placeholder="Минимальная цена" aria-label="default input example" id="min_price" />
            <input className="form-control" type="text" placeholder="Максимальная цена" aria-label="default input example" id="max_price" />
            
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="checkM" value="option1"/>
            <label className="form-check-label" htmlFor="checkM">Men</label>
            </div>

            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="checkW" value="option2"/>
            <label className="form-check-label" htmlFor="checkW">Women</label>
            </div>
            <div>
            <button type="button" className="btn btn-primary" onClick={filters}>Применить</button>
            <button type="button" className="btn btn-primary" onClick={cancel_filters}>Сбросить</button>
            </div>
            <div className="cards__container">
                {sneakers.map((sneakers) => {
                    return (
                    <Card countInBracket={inBracket(sneakers.id)} sneaker={sneakers} key={sneakers.id} onAdd={onAdd} onRemove={onRemove} />
                    );
                })}
            </div>
        </>
    );
};

export default Store;