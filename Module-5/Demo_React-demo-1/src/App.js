
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CreateStudent from "./pages/students/CreateStudent";
import EditStudent from "./pages/students/EditStudent";
import ListStudent from "./pages/students/ListStudent";
import DeleteStudent from "./pages/students/DeleteStudent";

function App() {
    return (
        <>
            <Outlet></Outlet>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/create-student" element={<CreateStudent/>}/>
                <Route path="/list-student" element={<ListStudent/>}/>
                <Route path="/delete-student" element={<DeleteStudent/>}/>
                <Route path="/edit-student/:id" element={<EditStudent/>}/>
                <Route path="/edit-student" element={<EditStudent/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </>
    );
}

export default App;
