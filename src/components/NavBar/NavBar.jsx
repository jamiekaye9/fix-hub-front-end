import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from './NavBar.module.css';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
      
    return (
        <nav>
            {user ? (
                <section className={styles.navbarContainer}>
                  <img className="small-logo" src="/Images/fix-hub-logo.png" alt="Fix Hub Logo" />
                  <ul className={styles.navbar}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/tickets/new'>Create a Ticket</Link></li>
                    <li><Link to='/tickets'>All Tickets</Link></li>
                    <li><Link to='/tickets/my-requests'>My Requests</Link></li>
                    {user.role === 'serviceDesk' ? (
                        <>
                          <li><Link to='/tickets/tickets-assigned'>Tickets Assigned</Link></li>
                          <li>Reports</li>
                        </>
                    ) : null}
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                  </ul>
                </section>
            ) : (
                <ul className={styles.navbar}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar;