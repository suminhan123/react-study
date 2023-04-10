import { Link, NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
    <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li>
                    <NavLink 
                    to ='' 
                    className={({isActive}) =>  // 중접된 자녀 라우트에 있을 경우 링크를 활성으로 취급할 수 있음
                    // / 경로는 모든 라우트에서 활성화됨
                    isActive ? classes.active : undefined}
                    end
                    >
                        Home
                    </NavLink>
                    
                </li>
                <li><NavLink to = 'products' className={({isActive}) => 
                isActive ? classes.active : undefined}
                >Prducts</NavLink></li>
            </ul>
        </nav>
    </header>
    );
}
export default MainNavigation;