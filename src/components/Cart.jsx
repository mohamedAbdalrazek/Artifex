import React, { useEffect, useState } from "react";
function Cart(props) {
    const totalPrice = props.cartItems.totalPrice;
    const itemCount = props.cartItems.itemCount;
    const cartItems = props.cartItems.cartData;
    const toggleCart = props.toggleCart;
    const [showFrom, setShowForm] = useState(false);
    const [showAdress, setShowAddress] = useState(true);
    const [showNameError, setShowNameError] = useState(false);
    const [showPhoneError, setShowPhoneError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showDeliveryError, setShowDeliveryError] = useState(false);
    const [showConfirmation, setShowConfirmatin] = useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        homeDelivery: true,
        address: "",
        metro: "",
    });
    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            let generalValue;
            if (type === "radio") {
                if (name === "address") {
                    generalValue = true;
                } else {
                    generalValue = false;
                }
            } else {
                generalValue = value;
            }
            return {
                ...prevFormData,
                [name]: generalValue,
            };
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        let check = true;
        !formData.name
            ? (setShowNameError(true), (check = false))
            : setShowNameError(false);
        !formData.phone || formData.phone / 2 === NaN
            ? (setShowPhoneError(true), (check = false))
            : setShowPhoneError(false);
        !formData.email || !formData.email.includes("@")
            ? (setShowEmailError(true), (check = false))
            : setShowEmailError(false);
        if (formData.homeDelivery) {
            !formData.address
                ? (setShowDeliveryError(true), (check = false))
                : setShowDeliveryError(false);
            console.log(check);
        } else {
            !formData.metro
                ? (setShowDeliveryError(true), (check = false))
                : setShowDeliveryError(false);
            console.log(check);
        }
        if (check) {
            setShowConfirmatin(true);
            props.clearCart()
        }
    }

    let price = showAdress ? 50 : 25;
    function toggleForm() {
        setShowForm((prevShowForm) => !prevShowForm);
    }

    const header = (
        <div className="cart--header">
            <p className="header--item-count">{itemCount} عدد العناصر</p>
            <h1 className="header--title">عربة التسوق</h1>
        </div>
    );

    const cartItem = cartItems.map((item) => {
        return (
            <div className="row cart--item" key={item.key}>
                <p
                    className="item--delete"
                    onClick={() => props.deleteItem(item.id, item)}
                >
                    X
                </p>
                <div className="col-10 item--info">
                    <div className="item--price">
                        <span> {item.price} </span>
                        <span className="price--tag">ج.م</span>
                    </div>
                    <div className="extended--count">
                        <button
                            className="count"
                            onClick={() => props.adjust(item, 1)}
                        >
                            +
                        </button>
                        <p className="count--number">{item.count}</p>
                        <button
                            className="count"
                            onClick={() => props.adjust(item, -1)}
                        >
                            -
                        </button>
                    </div>
                    <div>
                        <h3 className="item--title">{item.title}</h3>
                        <p className="item--description"> {item.minDesc}</p>
                    </div>
                </div>
                <div className="col-2 item--image-container">
                    <img
                        src={`../../cardImages/${item.name}.jpg`}
                        alt=""
                        className="item--image"
                    />
                </div>
            </div>
        );
    });
    const footer = (
        <div className="cart--footer ">
            <button
                className="cart--button "
                onClick={itemCount ? toggleForm : undefined}
            >
                أكمل عملية الشراء
            </button>
            <div className="cart--price">
                <span> {totalPrice} </span>
                <span className="price--tag">ج.م</span>
            </div>
            <h3 className="cart--second-header">
                المجموع الكلي ({itemCount} سلعة)
            </h3>
        </div>
    );
    const customerForm = (
        <form className="customer" onSubmit={handleSubmit}>
            <div className="previous" onClick={toggleForm}>
                <i class="fa-solid fa-chevron-left"></i>
                <p>الرجوع لعربة التسوق</p>
            </div>
            <div className="customer--name">
                <input
                    type="text"
                    placeholder="الأسم"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <label htmlFor="name">الأسم </label>
                {showNameError && (
                    <p className="customer--form-error">برجاء كتابة الأسم</p>
                )}
            </div>
            <div className="customer--phone">
                <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    pattern="[0]{1}[1]{1}[0-9]{9}"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    value={formData.phone}
                />
                <label htmlFor="phone">رقم الهاتف </label>
                {showPhoneError && (
                    <p className="customer--form-error">
                        برجاء كتابة رقم الهاتف
                    </p>
                )}
            </div>
            <div className="customer--email">
                <input
                    type="email"
                    placeholder="الأيميل"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <label htmlFor="email">الأيميل </label>
                {showEmailError && (
                    <p className="customer--form-error">
                        برجاء كتابة الأيميل بشكل صحيح
                    </p>
                )}
            </div>
            <p className="customer--note">التوصيل متاح للقاهرة والجيزه فقط!</p>
            <div className="customer--option">
                <input
                    type="radio"
                    id="home"
                    value="home"
                    defaultChecked
                    name="homeDelivery"
                    checked={formData.homeDlivery}
                    onChange={handleChange}
                    onClick={() => {
                        setShowAddress(true);
                    }}
                />
                <label htmlFor="home" class="radio--label">
                    التوصيل للمنزل
                </label>
                <input
                    type="radio"
                    id="metro"
                    name="homeDelivery"
                    checked={formData.homeDlivery}
                    onChange={handleChange}
                    value="metro"
                    onClick={() => {
                        setShowAddress(false);
                    }}
                />
                <label htmlFor="metro" class="radio--label">
                    التوصيل للمترو
                </label>
            </div>
            {showAdress ? (
                <div className="customer--address">
                    <textarea
                        name="address"
                        id="addrss"
                        placeholder="العنوان بالتفصيل"
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <label htmlFor="address">العنوان بالتفصيل </label>
                </div>
            ) : (
                <div className="customer--metro">
                    <input
                        type="text"
                        placeholder="اقرب محطة ميترو"
                        name="metro"
                        id="station"
                        onChange={handleChange}
                        value={formData.metro}
                    />
                    <label htmlFor="station">أقرب محطة ميترو </label>
                </div>
            )}
            {showDeliveryError && (
                <p className="customer--form-error">
                    برجاء كتابة العنوان بشكل صحيح{" "}
                </p>
            )}
            <div className="customer--conclusion">
                <p>السعر:{totalPrice} ج.م</p>
                <p>
                    {showAdress ? " للمنزل" : "لاقرب محطة مترو"} مصاريف الشحن{" "}
                    {price} ج.م
                </p>
                <p>السعر الكلي :{totalPrice + price} ج.م</p>
            </div>
            <button className="customer--send">ارسال الطلب</button>
        </form>
    );
    const confirmation = (
        <div>
            <p className="confirmation--text">
                لقد تم ارسال طلبكم بنجاح سيتم التواصل معكم في خلال 24 ساعة
                لتأكيد الطلب
            </p>
            <button className="continue-shopping" onClick={toggleCart}>اكمال التسوق</button>
        </div>
    );
    return (
        <div className="cart">
            <div className="cart--overlay" onClick={toggleCart}></div>
            <div className="container">
                {!showConfirmation ? (
                    <p className="cart--close" onClick={toggleCart}>
                        X
                    </p>
                ) : undefined}
                {!showFrom ? (
                    <div>
                        {header}
                        {cartItem}
                        {footer}
                    </div>
                ) : !showConfirmation ? (
                    <div>{customerForm}</div>
                ) : (
                    <div className="confirmation">{confirmation}</div>
                )}
            </div>
        </div>
    );
}
export default Cart;
