import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
    const { user } = useContext(UserContext);
    return (
        <nav>
            {user ? (
                <ul>
                    <li>Home</li>
                    <li>Create a Ticket</li>
                    <li>All Tickets</li>
                    <li>My Requests</li>
                    {user.role === 'Service Desk' ? (
                        <>
                          <li>My Tickets</li>
                          <li>Reports</li>
                        </>
                    ) : null}
                    <li>Sign Out</li>
                </ul>
            ) : (
                <ul>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar;