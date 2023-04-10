import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={ <HomePage /> } />
//     <Route path='/products' element={ <ProductsPage /> } />
//   </Route>
// );

const router = createBrowserRouter([
  { // 부모 라우트 역할 => 자식들의 래퍼 역할
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [ // 자식 라우트 역할
      { index: true, element: <HomePage /> }, 
      { path: 'products', element : <ProductsPage /> },
      { path: 'products/:productId', element : <ProductDetailPage /> },
    ],
  },
  // 두 라우트와 컴포넌트들을 이 레이아웃으로 실제로 감싸기 위해 이 특수한 라우트에 또 다른 프로퍼티를 추가해야함
  
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />
}

export default App;
