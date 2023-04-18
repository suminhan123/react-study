import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";
import { lazy, Suspense } from "react";

// 블로그 페이지에도 지연 로딩을 적용
const BlogPage = lazy(() => import("./pages/Blog")); // 이건 유효한 컴포넌트 함수가 아니라 실행이 안됨 / import는 프로미스를 반환
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading..</p>}>
                <BlogPage />
              </Suspense>
            ),
            // loader: postsLoader
            // import 프로미스를 반환 => 비동기 프로세스를 처리하려면 오랜시간이 소요
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()), // 로딩된 파일을 다운받기 => 지연되어 로딩됨
            // Blog page의 이 loader가 호출될 때만 실행됨 => blog 페이지에 방문할 때만 import되고 파일의 loader 함수가 실행됨
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading..</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
