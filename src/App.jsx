import { React, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import data from "./data.js";
import { nanoid } from "nanoid";
function App() {
    localStorage.clear()
    const [showCart, setShowCart] = useState(false);
    const [cardData, setCardData] = useState(() =>
        data.cardInfo.map((card) => {
            const id = nanoid();
            return {
                ...card,
                key: id,
                id: id,
            };
        })
    );
    const [cartItems, setCartItems] = useState(
        () =>
            JSON.parse(localStorage.getItem("cardItems")) || {
                totalPrice: 0,
                itemCount: 0,
                cartData: [],
            }
    );
    function clearCart(){
        localStorage.clear()
        setCartItems(
            () =>
            JSON.parse(localStorage.getItem("cardItems")) || {
                totalPrice: 0,
                itemCount: 0,
                cartData: [],
            }
        )
    }
    useEffect(() => {
        localStorage.setItem("cardItems", JSON.stringify(cartItems));
    }, [cartItems]);
    function toggleCart() {
        setShowCart((prevShowCart) => !prevShowCart);
    }
    function addItem(currentItem) {
        setCartItems((prevCartItem) => {
            let temp = [];
            let price =
                prevCartItem.totalPrice + currentItem.price * currentItem.count;
            let count = prevCartItem.itemCount + currentItem.count;
            let condition = true;
            for (let i = 0; i < prevCartItem.cartData.length; i++) {
                if (currentItem.id === prevCartItem.cartData[i].id) {
                    condition = false;
                }
                temp.push(prevCartItem.cartData[i]);
            }
            temp.push(currentItem);
            if (condition) {
                return {
                    totalPrice:price,
                    itemCount:count ,
                    cartData:temp,
                };
            }
            else{
                return prevCartItem
            }
        });
    }
    function adjust(currentItem, sign) {
        setCartItems((prevCartItem) => {
            const temp = [];
            let condition = true;
            if(sign === -1){
                condition = currentItem.count > 1
            }
            else{
                condition = currentItem.count < currentItem.itemsNumber
            }
            for (let i = 0; i < prevCartItem.cartData.length; i++) {
                if (prevCartItem.cartData[i].id === currentItem.id) {
                    temp.push({
                        ...prevCartItem.cartData[i],
                        count: condition
                            ? prevCartItem.cartData[i].count + sign * 1
                            : prevCartItem.cartData[i].count,
                    });
                } else {
                    temp.push(prevCartItem.cartData[i]);
                }
            }
            return {
                cartData: temp,
                totalPrice: condition
                    ? prevCartItem.totalPrice + sign * currentItem.price
                    : prevCartItem.totalPrice,
                itemCount: condition
                    ? prevCartItem.itemCount + sign * 1
                    : prevCartItem.itemCount,
            };
        });
    }
    function deleteItem(id, currentItem) {
        setCartItems((prevCartItem) => {
            return {
                totalPrice:
                    prevCartItem.totalPrice -
                    currentItem.price * currentItem.count,
                itemCount: prevCartItem.itemCount - currentItem.count,
                cartData: prevCartItem.cartData.filter(
                    (item) => item.id !== id
                ),
            };
        });
    }
    return (
        <div>
            <Nav
                toggleCart={toggleCart}
                cartLength={cartItems.itemCount}
                // handleChange={handleChange}
            />
            <Main
                data={cardData}
                addItem={addItem}
                toggleCart={toggleCart}
                cartLength={cartItems.itemCount}
            />
            {showCart && (
                <Cart
                    toggleCart={toggleCart}
                    cartItems={cartItems}
                    deleteItem={deleteItem}
                    adjust={adjust}
                    clearCart={clearCart}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;
