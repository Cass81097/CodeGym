import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>  
            <div className="container-fluid">
                <Header></Header>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Navbar></Navbar>
                    <Link to={'/list-product'}>List Product</Link>
                </div>
                <hr/>
                <h1>Product Management</h1>
                <Footer></Footer>
            </div>

        </>
    )
}