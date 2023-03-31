import React, {useState} from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [enterTitle, setEnterTitle] = useState('');
    const [enterAmount, setEnterAmount] = useState('');
    const [enterDate, setEnterDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnterTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnterAmount(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setEnterDate(event.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const expenseData = {
            title: enterTitle,
            amount : +enterAmount,
            date: new Date(enterDate)
        };
        props.onSaveExpenseData(expenseData);
        setEnterAmount('');
        setEnterAmount('');
        setEnterDate('');
    };
    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type='text' value={enterTitle} onChange={titleChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type='number' value={enterAmount} onChange={amountChangeHandler}min="0.01" step="0.01" />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type='date' value={enterDate} onChange={dateChangeHandler} min='2019-01-01' max="2022-12-31"/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
}
export default ExpenseForm;