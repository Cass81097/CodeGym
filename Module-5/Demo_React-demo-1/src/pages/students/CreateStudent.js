import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import axios from "axios";

export default function CreateStudent() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar></Navbar>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Link to={'/list-student'}>List Student</Link> |
                <Link to={'/create-student'}>Create Student</Link> |
                <Link to={'/delete-student'}>Delete Student</Link> |
                <Link to={'/edit-student'}>Edit Student</Link>
            </div>
            <hr />
            <div>
                <h1>Create Student</h1>
                <Formik
                    initialValues={{
                        // id: 0, 
                        name: '',
                        description: '',
                        action: '',
                        score: '',
                    }}
                    onSubmit={(data) => {
                        axios.post('http://localhost:3001/students', data).then(() => {
                            console.log(data);
                            alert('Success');
                            navigate('/list-student'); // Chuyển hướng đến trang danh sách sau khi lưu thành công (API). Gần giống window.location.herf nhưng không cần load trang.
                        });
                    }}
                >
                    <Form>
                        {/* <Field name={'id'} type={'number'}></Field> */}
                        <Field name={'name'}  placeholder={"Nhập tên"}></Field>
                        <Field name={'description'} placeholder={"Nhập mô tả"}></Field>
                        <Field name={'action'} placeholder={"Nhập hành động"}></Field>
                        <Field name={'score'} placeholder={"Nhập điểm"}></Field>
                        <button type="submit">Save</button>
                    </Form>
                </Formik>
            </div>
            <Footer></Footer>
        </>
    );
}