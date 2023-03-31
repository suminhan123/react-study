import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import './NewExpense.css';

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveExpenseDataHandler = (enterExpenseData) => {
        const expenseData = {
            ...enterExpenseData,
            id : Math.random().toString(),
        };
        console.log(expenseData);
        props.onAddExpense(expenseData);
        setIsEditing(false);
    }
    const startEditingHandler = () => {
        setIsEditing(true);
    }
    const stopEdiginHandler = () => {
        setIsEditing(false);
    }
    return(
        <div className="new-expense">
            {
                !isEditing && <button onClick={startEditingHandler}> Add New Expense</button>
            }
            {
                isEditing && 
                <ExpenseForm 
                    onSaveExpenseData={saveExpenseDataHandler} 
                    onCancel={stopEdiginHandler}/>
            }
        </div>
    );
}
export default NewExpense;