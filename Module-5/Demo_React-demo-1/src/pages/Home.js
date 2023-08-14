import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <Header />
            <Navbar />
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Link to={'/list-student'}>List Student</Link> |
                <Link to={'/create-student'}>Create Student</Link> |
                <Link to={'/edit-student'}>Edit Student</Link>
            </div>
            <hr/>
            <h1>Home Student</h1>
            <Footer />
        </>
    )
}