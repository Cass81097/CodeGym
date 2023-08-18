
import Footer from "../../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailProduct() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    const fetchProduct = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3001/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    return (
        <>
            
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Link to={"/list-product"}>List Product</Link> 
            </div>
            <hr />
            <div>
                <h1>Detail Product</h1>
                <div className="card">
                    <div className="card-header">Chi tiết sản phẩm</div>
                    <div className="card-body">
                        <h5 className="card-title">Tên sản phẩm: {product.title}</h5>
                        <p className="card-text">Mô tả: {product.description}</p>
                        <p className="card-text">Giá: {product.price} VND</p>
                        <button type="button" class="btn btn-primary" onClick={() => navigate('/list-product')}>Trở lại</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}