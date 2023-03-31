import UserItem from './UserItem';
import styles from './UserList.module.css';

const UserList = props => {
    return (
        <div className ={styles.userList}>
            {
                props.items.map(item => (
                    <UserItem name={item.name} age={item.age} id={item.id} onDelete={props.onDeleteItem}/>
                ))
            }
        </div>
    );
}
export default UserList;