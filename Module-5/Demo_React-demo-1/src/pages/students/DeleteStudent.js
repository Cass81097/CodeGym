import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteStudent() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchStudentList();
    }, []);

    const fetchStudentList = async () => {
        try {
            const res = await axios.get('http://localhost:3001/students');
            setList(res.data);
        } catch (error) {
            console.error('Error fetching student list:', error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`http://localhost:3001/students/${studentId}`);
            console.log('Student deleted successfully');
            alert('Student deleted successfully');
            await fetchStudentList();
        } catch (error) {
            console.error('Error deleting student:', error);
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
            <h1>Delete Student</h1>
            <div style={{ whiteSpace: 'nowrap' }}>
                {list.map((item, key) => (
                    <div key={key} style={{ display: 'flex' }}>
                        <Link style={{ textDecoration: 'none' }} to={'/edit-student/' + item.id}>
                            <h3 style={{ color: 'black' }}>{item.id}. {item.name} - {item.description} - {item.action} - {item.score}</h3>
                        </Link>
                        <button onClick={() => handleDelete(item.id)}>Delete Student</button>
                    </div>
                ))},
            </div>
            <Footer></Footer>
        </>
    );
}