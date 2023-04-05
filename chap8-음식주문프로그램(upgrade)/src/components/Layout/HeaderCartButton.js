import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false); // 애니메이션 클래스가 조건부로 추가될 때 마다 컴포넌트 렌더링되기 위해서
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;
    useEffect(() => {
        if (cartCtx.items.length == 0){
            return;
        }
        setBtnIsHighLighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false); // 범프 클래스 대신 빈 문자열이 문자열로 츠가되었는지 확인 =>
            // css 클래스가 렌더링된 돔에서 삭제
            // 클린업으로 사이드 이팩트 정리
        }, 300);

        return () => {
            clearTimeout(timer); // 이전 타이미는 지우고 확실해 새 타이머를 설정
        };
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}
export default HeaderCartButton;