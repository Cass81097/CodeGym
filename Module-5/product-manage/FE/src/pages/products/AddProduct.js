import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import axios from "axios";

export default function AddProduct() {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3001/products", data);
            alert("Success");
            navigate("/list-product");
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
                            Thêm sản phẩm
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
                                description: ""
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
                                    <button type="submit" className="btn btn-primary">
                                        Thêm sản phẩm
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}