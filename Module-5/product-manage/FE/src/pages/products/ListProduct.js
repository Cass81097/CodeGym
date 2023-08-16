import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import $ from "jquery";

export default function ListProduct() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductTitle, setSelectedProductTitle] = useState("");

    useEffect(() => {
        fetchProductList();
    }, []);

    const fetchProductList = async () => {
        try {
            const res = await axios.get("http://localhost:3001/products");
            setList(res.data);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    const openModal = (productId, productTitle) => {
        setSelectedProductId(productId);
        setSelectedProductTitle(productTitle);
    };

    const deleteProduct = async () => {
        try {
            if (!selectedProductId) return;
            await axios.delete(`http://localhost:3001/products/${selectedProductId}`);
            await fetchProductList();
            alert("Xóa thành công");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Link to={"/list-product"}>List Product</Link> 
            </div>
            <hr />
            <div className="header-product">
                <div>
                    <h2>Danh sách sản phẩm</h2>
                </div>
                <button type="button" className="btn btn-success">
                    <Link to={"/add-product"} style={{ color: "white", textDecoration: "none" }}>
                        Thêm mới
                    </Link>
                </button>
            </div>

            <div style={{ whiteSpace: "nowrap" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, key) => (
                            <tr key={key}>
                                <th scope="row">{item.id}</th>
                                <th>
                                    <Link to={"/product/" + item.id}>{item.title}</Link>
                                </th>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => openModal(item.id, item.title)} data-toggle="modal" data-target="#myModal">Xóa</button>
                                    <button type="button" className="btn btn-primary" onClick={() => navigate("../edit-product/" + item.id)}>Sửa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer></Footer>

            {/* Delete Product */}
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Xóa sản phẩm: {selectedProductTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa sản phẩm ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-danger" onClick={deleteProduct} data-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}