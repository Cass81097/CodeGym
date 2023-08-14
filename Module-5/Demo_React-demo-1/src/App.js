import logo from './logo.svg';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CreateStudent from "./pages/students/CreateStudent";
import EditStudent from "./pages/students/EditStudent";
import ListStudent from "./pages/students/ListStudent";

function App() {
    return (
        <>
            <Outlet></Outlet>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/create-student" element={<CreateStudent/>}/>
                <Route path="/list-student" element={<ListStudent/>}/>
                <Route path="/edit-student/:id" element={<EditStudent/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </>
    );
}

export default App;
