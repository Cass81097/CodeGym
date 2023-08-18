
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export default function ListProduct() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const { list, deleteProduct, alertDelete, setAlertDelete } = useContext(AppContext);

    const navigate = useNavigate();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductTitle, setSelectedProductTitle] = useState("");
    // const [alertDelete, setAlertDelete] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const openModal = (productId, productTitle) => {
        setSelectedProductId(productId);
        setSelectedProductTitle(productTitle);
    };

    const handleDeleteProduct = async () => {
        try {
            if (!selectedProductId) return;
            const success = await deleteProduct(selectedProductId);
            if (success) {
                setAlertDelete("Xóa thành công!!!");
                setTimeout(() => {
                    setAlertDelete(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <div className="ListProduct">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Link to={"/list-product"}>List Product</Link>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={() => handleLogout()} type="button" className="btn btn-warning" >Log Out</button>
                </div>

                <hr />
                <div className="header-product">
                    <div>
                        <h2>Danh sách sản phẩm :</h2>
                        {alertDelete && (
                            <div className="alert alert-success" role="alert">
                                {alertDelete}
                            </div>
                        )}
                    </div>
                    <button type="button" className="btn btn-success" style={{ margin: "0 0 10px 5px" }}>
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
                                <th scope="col">User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <th>
                                        <Link to={"/product/" + item.id}>{item.title}</Link>
                                    </th>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td className="my-button">
                                        <button type="button" className="btn btn-danger" onClick={() => openModal(item.id, item.title)} data-toggle="modal" data-target="#myModal">Xóa</button>
                                        <button type="button" className="btn btn-primary" onClick={() => navigate("../edit-product/" + item.id)}>Sửa</button>
                                    </td>
                                    <td>{item.user.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
                                <button type="button" className="btn btn-danger" onClick={handleDeleteProduct} data-dismiss="modal">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}