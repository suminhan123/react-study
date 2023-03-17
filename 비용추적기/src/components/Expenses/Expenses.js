import React, {useState} from 'react'
import './Expenses.css';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

export default function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2020');
    const filterChangeHandler = (year) => {
        console.log(year);
        setFilteredYear(year);
    }
    const filterExpense = props.item.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;}
        )

    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}/>
                <ExpensesChart expenses={filterExpense}/>
                <ExpensesList items={filterExpense} />
            </Card>
        </div>
    )
}
