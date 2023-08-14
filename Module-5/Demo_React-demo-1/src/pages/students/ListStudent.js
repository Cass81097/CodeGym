import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListStudent() {
    const [list, setList] = useState([]); // khởi tạo và quản lý trạng thái (state) trong một component.
    useEffect(() => {
        axios.get('http://localhost:3001/students').then(res => {
            setList(res.data)
        })
    }, [])

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
            <hr />
            <h1>List Student</h1>
            {list.map((item, key) =>{
                return (
                    <Link to={'/edit-student/' + item.id}>
                    <h3 key={key}>{item.id}. {item.name} - {item.description} - {item.action} - {item.score}</h3>
                    </Link>
                )
            })}
            <Footer></Footer>
        </>
    )
}
