import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import axios from "axios";

export default function EditStudent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        fetchStudent(id);
    }, [id]);   

    const fetchStudent = async (id) => {
        let res = await axios.get(`http://localhost:3001/students/${id}`)
        try {
            const student = res.data;
            setInitialValues({
                id: student.id,
                name: student.name,
                description: student.description,
                action: student.action,
                score: student.score,
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
            <Navbar></Navbar>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Link to={'/list-student'}>List Student</Link> |
                <Link to={'/create-student'}>Create Student</Link> |
                <Link to={'/delete-student'}>Delete Student</Link> 
            </div>
            <hr />
            <div>
                <h1>Edit Student</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(data) => {
                        axios.put(`http://localhost:3001/students/${id}`, data).then(() => {
                            console.log(data);
                            alert('Success');
                            navigate('/list-student'); // Chuyển hướng đến trang danh sách sau khi lưu thành công
                        });
                    }}
                >
                    <Form>
                        <Field name={'id'} type={'number'}></Field>
                        <Field name={'name'}></Field>
                        <Field name={'description'}></Field>
                        <Field name={'action'}></Field>
                        <button type="submit">Save</button>
                    </Form>
                </Formik>
            </div>
            <Footer></Footer>
        </>
    )
}
