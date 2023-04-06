import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';

function App() {
  const user = useSelector(state => state.auth.isAuthenticated)
  return (
    <Fragment>
      <Header />
      {!user && <Auth />}
      {user && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
