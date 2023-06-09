import { useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };
    const orderHandler = () => {
        setIsCheckout(true);
    }
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-food-http-6964e-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem 
                    key={item.id} 
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} // 기본적인 인수를 미리 구성이 가능  실행전 !
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
        ))}
        </ul>
    );

    const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && 
        <button className={styles.button} onClick={orderHandler} >Order</button>
    }
    </div>

    const cartModalContent = 
    <>
        {cartItems}
        <div>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut&& <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckOut && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order data..</p>;
    const didSubmitModalContent = 
    <>
    <p>successfully sent the order</p>
    <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>Close</button>
    </div>
    </>
    
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit &&cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting &&didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;