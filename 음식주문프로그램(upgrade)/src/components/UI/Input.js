import styles from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return(
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input} />
        </div>
    ); // ref를 통해 input에 접근이 가능해짐
})
export default Input;