import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ListProduct from "./pages/products/ListProduct";
import DetailProduct from "./pages/products/DetailProduct";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";


function App() {
    return (
        <>
            <Outlet></Outlet>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/list-product" element={<ListProduct/>}/>
                <Route path="/add-product" element={<AddProduct/>}/>
                <Route path="/product/:id" element={<DetailProduct/>}/>
                <Route path="/edit-product/:id" element={<EditProduct/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </>
    );
}

export default App;
