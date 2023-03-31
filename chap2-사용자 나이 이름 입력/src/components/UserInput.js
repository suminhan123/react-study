import styles from './UserInput.module.css';
import React, { useState, useRef } from 'react';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import Wrapper from './Helpers/Wrapper';

const UserInput = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [userName, setUserName] = useState("");
    const [userAge, setUserAge] = useState("");
    const [error, setError] = useState();

    const nameChangeHandler = (e) => {
        setUserName(e.target.value);
    }
    const ageChangeHandler = (e) => {
        setUserAge(e.target.value);
    }
    const userClickHandler = () => {
        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const user = { name : userName, age : userAge};
        if (userName === ""){
            setError({
                title:"이름 입력 잘못",
                message: "이름 입력창을 다시 입력해주세요"
            });
            return;
        }
        if (Number(userAge) <= 0){
            setError({
                title:"나이 입력 잘못",
                message: "나이 입력창을 다시 입력해주세요"
            });
            console.log(error);
            return;
        }
        props.onAddUser(user);
        setUserAge("");
        setUserName("");
    }
    const errorHandler = () => {
        setError(null);
        console.log(error);
    }
    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfrim={errorHandler}/>}
            <Card className= {styles.userInput}>
                <h6>username</h6>
                <input type="text" value={userName} onChange={nameChangeHandler} ref={nameInputRef}/>
                <h6>userage</h6>
                <input value={userAge} onChange={ageChangeHandler} ref={ageInputRef}/>
                <Button onClick={userClickHandler}>
                    submit
                </Button>
            </Card>
        </Wrapper>

    );
}
export default UserInput;