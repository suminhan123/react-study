import Card from '../UI/Card';
import styles from './UserItem.module.css';

const UserItem = props => {
    const deleteHandler = () => {
        props.onDelete(props.id);
    }
    return(
        <Card>
        <div className={styles.userItem} onClick={deleteHandler}>
            <h5>{props.name}</h5>
            <h5>{props.age}</h5>
        </div>
        </Card>
    );
}
export default UserItem;