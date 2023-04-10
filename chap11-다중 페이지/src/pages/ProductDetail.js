import { Link, useParams } from "react-router-dom";

function ProductDetailPage() {
    const params = useParams(); 
    // 프로퍼티로 정의한 모든 역동적 경로 세그먼트가 담긴 객체
    return (
        <>
        <h1>Product Details</h1>
        <p>{params.productId}</p>
        <p><Link to='..' relative='path'>back</Link></p> 

        </>
    );
}
export default ProductDetailPage;