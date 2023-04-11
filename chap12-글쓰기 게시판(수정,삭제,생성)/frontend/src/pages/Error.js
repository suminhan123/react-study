import { useRouteError } from "react-router";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();
  let title = "error occured";
  let message = "error occured";
  if (error.status === 500) {
    message = error.data.message; // data객체는 다시 객체로 반환 그렇지 않으면 형식이 Json이므로
  }
  if (error.status === 404) {
    title = "not found";
    message = "could not find resource or page";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
export default ErrorPage;
