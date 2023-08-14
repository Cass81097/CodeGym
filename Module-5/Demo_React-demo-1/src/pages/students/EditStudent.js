import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {Link, useParams} from "react-router-dom";

export default function EditStudent() {
    const {id} = useParams();
    console.log(id);
    return (
        <>
            <Navbar></Navbar>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Link to={'/list-student'}>List Student</Link> |
                <Link to={'/create-student'}>Create Student</Link> |
                <Link to={'/edit-student'}>Edit Student</Link>
            </div>
            <hr/>
            <h1>Edit Student</h1>
            <Footer></Footer>
        </>
    )
}
