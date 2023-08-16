import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListStudent() {
    const [list, setList] = useState([]); // khởi tạo và quản lý trạng thái (state) trong một component.

    useEffect(() => {
        fetchStudentList();
    }, []); // didMount

    const fetchStudentList = async () => {
        try {
            const res = await axios.get('http://localhost:3001/students');
            setList(res.data);
        } catch (error) {
            console.error('Error fetching student list:', error);
        }
    };

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
            <h1>List Student</h1>
            <div style={{ whiteSpace: 'nowrap' }}>
                {list.map((item, key) => (
                    <div key={key} style={{ display: 'flex' }}>
                        <Link style={{ textDecoration: 'none' }} to={'/edit-student/' + item.id}>
                            <h3 style={{ color: 'black' }}>{item.id}. {item.name} - {item.description} - {item.action} - {item.score}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </>
    )
}
