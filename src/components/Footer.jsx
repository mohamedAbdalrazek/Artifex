import React from"react"

function Footer(){
    return(
        <div className="footer">
            <div className="container">
                <div className="footer--social">
                    <i className="fa-brands fa-instagram icon"></i>
                    <i className="fa-brands fa-facebook-f icon"></i>
                </div>
                <div className="footer--credit">
                    حقوق الطبع والنشر © لعام 2023 محفوظة  Mohamed Abderlazek 
                </div>
                <a href="#" className="footer--logo">
                    {/* <img src="images/logo.png" alt="" /> */}
                    Artifex
                </a>
            </div>
        </div>
    )
}
export default Footer