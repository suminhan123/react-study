import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './Root.module.css';

function RootLayout() { // 자녀 라우트 요소들이 렌더링 되어야 할 장소를 표시하는 역할
    return (
        <>
        <MainNavigation />
        <main>
            <Outlet /> 
            {/* 자녀 라우터 장소를 표시하는 마커 */}

        </main>
        
        </>
    );
}
export default RootLayout;