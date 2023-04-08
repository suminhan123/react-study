import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-food-http-6964e-default-rtdb.firebaseio.com/cart.json'
            );
    
            if (!response.ok) {
            throw new Error('Could not fetch cart data!');
            }
    
            const data = await response.json();
    
            return data;
        };
    
        try {
            const cartData = await fetchData();
            dispatch(
            cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            })
            );
        } catch (error) {
            console.log(error);
            dispatch(
            uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!',
            })
            );
        }
        };
    };
export const sendCartData = (cart) => {// 작업객체를 반환하므로써 작업 크리에이터로 이를 작성할 수 있음
    return async (dispatch) => { // 디스패치 전에 다른 코드 (비동기 코드와 side effect)를 수행할 수 있음 => 아직 리듀서 도달하지 않음
        dispatch( // => 이런 알림 작업을 dispatch
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-food-http-6964e-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }
        try {
            await sendRequest();// 프로미스를 반환    
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        }catch (error){
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'fetching cart data failed!',
                })
            );
        }


    }

}
