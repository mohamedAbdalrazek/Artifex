import { React, useState } from "react";
import ExtendedCard from "./ExtendedCard";
function Main(props) {
    const [data, setData] = useState(props.data);
    const [showExtended, setShowExtended] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [currentItem, setCurrentItem] = useState([]);
    function toggleExtended(id) {
        if (id) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    setCurrentItem(data[i]);
                    break;
                }
            }
            setCurrentId(id);
        }
        setShowExtended((prevShowExtended) => !prevShowExtended);
    }

    const dataCard = data.map((card) => {
        return (
            <div
                className={`card col-sm-6 col-md-4 col-lg-3 ${
                    !card.itemsNumber ? "unavailable" : undefined
                }`}
                onClick={
                    card.itemsNumber ? () => toggleExtended(card.id) : undefined
                }
                key={card.key}
            >
                {!card.itemsNumber ? (
                    <span className="card--unavailable"> غير متوفر</span>
                ) : undefined}
                <div className="card--image-container">
                    <img
                        src={`../../cardImages/${card.name}.jpg`}
                        alt=""
                        className="card--photo"
                    />
                </div>
                <div className="card--info">
                    <div className="card--header">
                        {
                            <div className="card--price">
                                <span> {card.price} </span>
                                <span className="price--tag">ج.م</span>
                            </div>
                        }
                        <h1 className="card--title">{card.title}</h1>
                    </div>
                    <p className="card--description">{card.minDesc}</p>
                    {/* <button className="card--add" onClick={()=>props.addItem(card.id)}>اضف الي عربة التسوق</button> */}
                </div>
            </div>
        );
    });
    return (
        <div className="container main">
            <div className="row ">{dataCard}</div>
            {showExtended && (
                <ExtendedCard
                    toggleExtended={toggleExtended}
                    currentItem={currentItem}
                    id={currentId}
                    addItem={props.addItem}
                    toggleCart={props.toggleCart}
                    cartLength={props.cartLength}
                />
            )}
        </div>
    );
}
export default Main;
