import { React, useState } from "react";

function Nav(props) {
    
    return (
        <div className="navbar sticky-top">
            <div className="container">
                <div className="nav--cart" onClick={props.toggleCart}>
                    <i className="fa-solid fa-cart-shopping cart--icon"></i>
                    <div className="cart--count">{props.cartLength}</div>
                </div>
                <form action="" className="nav--form">
                    <button className="form--submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input
                        // onChange={props.handleChange}
                        type="text"
                        placeholder="... بحث"
                        className="form--input"
                    />
                </form>
                <div className="nav--logo">
                    {/* <img src="images/logo.png" alt="Hand Made" /> */}
                    <a href="#">Artifex</a>
                    <div className="nav--social">
                        <i className="fa-brands fa-instagram icon"></i>
                        <i className="fa-brands fa-facebook-f icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Nav;
