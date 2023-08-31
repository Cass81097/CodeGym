import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";

export default function CustomNavbar() {
    const { user, logOutUser } = useContext(AuthContext)
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const loadHome = () => {
        window.location.href = "/";
    };

    return (
        <>
            <Navbar bg="dark" className="custom-navbar" style={{ height: "3.75rem" }} >
                <Container>
                    <h2>
                        <Link className="link-light text-decoration-none" onClick={() => loadHome()}>
                            Weiboo Chat
                        </Link>
                    </h2>
                    {
                        user && (
                            <span className="text-warning">Welcome {capitalizeFirstLetter(user?.username)}
                            </span>
                        )
                    }


                    <Nav>
                        <Stack direction="horizontal" gap={3}>
                            {
                                user && (<>
                                    <Notifications />
                                    <Link onClick={() => logOutUser()} to="/login" className="link-light text-decoration-none" >
                                        Logout
                                    </Link>
                                </>)
                            }
                            {
                                !user && (<>  <Link to="/login" className="link-light text-decoration-none" >
                                    Login
                                </Link>
                                    <Link to="/register" className="link-light text-decoration-none" >
                                        Register
                                    </Link>
                                </>)
                            }
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>


        </>
    );
}
