import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    return (
        <>
        <MainNavigation />
        <main>
            <h1>error occured</h1>
            <p>could not find this page</p>
        </main>
        </>
    );
}
export default ErrorPage;