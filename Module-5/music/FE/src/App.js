import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Album from "./pages/music/Album"

function App() {
    return (
        <>
            <Outlet></Outlet>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/album/:id" element={<Album/>}/>
            </Routes>
        </>
    );
}

export default App;
