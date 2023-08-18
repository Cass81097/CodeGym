import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const [list, setList] = useState([]);
    const [alertDelete, setAlertDelete] = useState(null);

    useEffect(() => {
        fetchProductList();
    }, []);

    const fetchProductList = () => {
        axios.get("http://localhost:3001/products")
            .then((res) => {
                setList(res.data);
            })
            .catch((error) => {
                console.error("Error fetching product list:", error);
            });
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/products/${productId}`);
            fetchProductList();
            return true; 
        } catch (error) {
            console.error("Error deleting product:", error);
            return false; 
        }
    };

    return (
        <AppContext.Provider value={{ list, deleteProduct, alertDelete, setAlertDelete }}>
            {children}
        </AppContext.Provider>
    );
};