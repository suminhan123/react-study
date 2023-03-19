import React from 'react';
import Button from './Button';
import Card from './Card';
import styles from './ErrorModal.module.css';
import ReactDOM from 'react-dom';
const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onConfrim} />;
};
const ModalOverlay = props => {
    return (
        <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={props.onConfrim}>Okay</Button>
                </footer>
        </Card>
    )
}
const ErrorModal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal( 
                <Backdrop onConfrim={props.onConfrim} />,
                document.getElementById('backdrop-root'))
            }
            {ReactDOM.createPortal(
                <ModalOverlay title={props.title} message={props.message} onConfrim={props.onConfrim} />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    );
}
export default ErrorModal;