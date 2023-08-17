import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    let userId = localStorage.getItem('userId')
    console.log(userId);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Biến trạng thái cho Modal
    const [opacityBackground, setOpacityBackGround] = useState(false); // Biến trạng thái cho Background

    const handleSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3001/products", data);
            console.log(data);
            setShowModal(true);
            setOpacityBackGround(true);

            setTimeout(() => {
                setShowModal(false);
                setOpacityBackGround(false);
                navigate("/list-product");
            }, 1000);
        } catch (error) {
            console.error("Error adding product:", error);
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
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Thêm sản phẩm :
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={{
                                title: "",
                                price: "",
                                description: "",
                                user: {
                                    id: userId
                                }
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="title" className="col-form-label">Tên sản phẩm:</label>
                                    <Field type="text" className="form-control" id="title" name="title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="col-form-label">Giá:</label>
                                    <Field type="text" className="form-control" id="price" name="price" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="col-form-label">Mô tả:</label>
                                    <Field as="textarea" className="form-control" id="description" name="description" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/list-product')}>Quay về</button>
                                    <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#addModal">Thêm sản phẩm</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer></Footer>

            {/* Show Add Alert */}
            {showModal && (
                <div
                    className="modal fade show"
                    id="addModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                    style={{ display: "block" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header" style={{ justifyContent: "center" }}>
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    Thêm sản phẩm thành công!!!
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Opacity Background when show Alert */}
            {opacityBackground && (
                <div className="modal-backdrop fade show"></div>
            )}
        </>
    );
}