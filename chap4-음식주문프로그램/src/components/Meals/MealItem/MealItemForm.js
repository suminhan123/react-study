import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';
const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value; // 항상 문자열임
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 || 
            enteredAmountNumber > 5
        ){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref = {amountInputRef}
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>
                + Add
            </button>
            {!amountIsValid && <p>please enter a valid amount </p>}
        </form>

    );
}
export default MealItemForm;