
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import axios from "axios";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    const fetchProduct = async (id) => {
        let res = await axios.get(`http://localhost:3001/products/${id}`)
        try {
            const product = res.data;
            setInitialValues({
                id: product[0].id,
                title: product[0].title,
                price: product[0].price,
                description: product[0].description,
            });
        }
        catch (error) {
            console.error(error);
        };
    }

    if (initialValues === null) {
        return <div>Loading...</div>;
    }

    return (
        <>  
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Link to={'/list-product'}>List Product</Link>
            </div>
            <hr />
            <Formik
                initialValues={initialValues}
                onSubmit={async (data) => {
                    try {
                        await axios.put(`http://localhost:3001/products/${id}`, data);
                        console.log(data);
                        alert('Success');
                        navigate('/list-product');
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Sửa sản phẩm :
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
                                        Sửa sản phẩm
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    )
}
