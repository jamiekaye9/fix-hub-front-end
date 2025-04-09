import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from '../../services/userService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                setUsers(fetchedUsers);
            } catch (e) {
                console.log(e);
            }
        }
        if (user) fetchUsers();
    }, [user]);

    return (
        <main className={styles.dashboardContainer}>
            <h1 className={styles.title}>Dashboard</h1>
            {users.length > 0 ? (
                users.map((u) => (
                    <section key={u._id}>
                        <ul>
                            <li className={styles.userList}>{u.firstName} {u.lastName}</li>
                        </ul>
                    </section>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </main>
    )
}

export default Dashboard;