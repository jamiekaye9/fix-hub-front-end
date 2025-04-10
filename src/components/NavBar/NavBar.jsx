import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <section className={styles.navbarContainer}>
          <img
            className="small-logo"
            src="/Images/fix-hub-logo.png"
            alt="Fix Hub Logo"
          />
          <ul className={styles.navbarIn}>
            <li>
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/tickets/new" className={styles.link}>
                Create a Ticket
              </Link>
            </li>
            <li>
              <Link to="/tickets" className={styles.link}>
                All Tickets
              </Link>
            </li>
            <li>
              <Link to="/tickets/my-requests" className={styles.link}>
                My Requests
              </Link>
            </li>
            {user.role === "serviceDesk" ? (
              <li>
                <ul className={styles.navbarInTwo}>
                  <li>
                    <Link
                      to="/tickets/tickets-assigned"
                      className={styles.link}
                    >
                      Tickets Assigned
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.link}>
                      Reports
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            <li>
              <Link to="/" onClick={handleSignOut} className={styles.link}>
                Sign Out
              </Link>
            </li>
          </ul>
        </section>
      ) : (
        <ul className={styles.navbarOut}>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className={styles.link}>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className={styles.link}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
