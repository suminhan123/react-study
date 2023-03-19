import { useState } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import UserList from './components/UserList';

function App() {
  const [userList, setUserList] = useState([]);
  const addUserHandler = (user) => {
    const newUser = { id : Math.random(), name : user.name, age : user.age };
    setUserList( prevUser => {
      return [...prevUser, newUser];
    })
  }
  const deleteItemHandler = (userId) => {
    setUserList ( prevUser => {
      const updateUser = prevUser.filter(user => user.id != userId);
      return updateUser;
    })
  }
  return (
    <div className="App">
      <UserInput onAddUser={addUserHandler}/>
      <UserList items={userList} onDeleteItem={deleteItemHandler} />
    </div>
  );
}

export default App;
