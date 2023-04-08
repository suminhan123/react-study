import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'pending',
    //       title: 'Sending...',
    //       message: 'Sending cart data!',
    //     })
    //   );
    //   const response = await fetch(
    //     'https://react-food-http-6964e-default-rtdb.firebaseio.com/cart.json',
    //     {
    //       method: 'PUT',
    //       body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed.');
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     })
    //   );
    // };

    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }

    // sendCartData().catch((error) => {
    //   console.log(error);
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!',
    //     })
    //   );
    // });
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed){
      dispatch(sendCartData(cart));
    }
     // 항상 dispatch 한 것은 항상 작업 크리에이터
    // 다른 함수를 반환하는 것을 대신 전달 => 리덕스 툴킷은 작업 크리에이터에서 허용
    // 실제로 작업 객체가 아닌 함수로 작업을 디스패치하면 해당 함수를 자동으로 실행
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

