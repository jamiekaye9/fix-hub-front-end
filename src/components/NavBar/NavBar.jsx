import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
      
    return (
        <nav>
            {user ? (
                <ul>
                    <li>Home</li>
                    <li>Create a Ticket</li>
                    <li>All Tickets</li>
                    <li>My Requests</li>
                    {user.role === 'serviceDesk' ? (
                        <>
                          <li>My Tickets</li>
                          <li>Reports</li>
                        </>
                    ) : null}
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
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