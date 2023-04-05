import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [fromInputsValidity, setFormInputValidity] = useState({
        // 처음부터 오류메시지를 보이지 않으려고 일단 true로
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const postalRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredPostalCode = postalRef.current.value;
        const enteredStreet = streetRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid 
        && enteredCityIsValid && enteredPostalCodeIsValid;
        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    };

    return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${
            fromInputsValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameRef}/>
            {!fromInputsValidity.name && <p>이름 다시 입력해주세요</p>}
        </div>
        <div className={`${classes.control} ${
            fromInputsValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetRef}/>
            {!fromInputsValidity.street && <p>길 다시 입력해주세요</p>}
        </div>
        <div className={`${classes.control} ${
            fromInputsValidity.postalCode ? '' : classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalRef}/>
            {!fromInputsValidity.postalCode && <p>우편번호 다시 입력해주세요</p>}
        </div>
        <div className={`${classes.control} ${
            fromInputsValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityRef}/>
            {!fromInputsValidity.city && <p>도시 다시 입력해주세요</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
    );
};

export default Checkout;