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
        <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Dashboard</h1>
        <main className={styles.cardGrid}>
            <div className={styles.headerCard}>
                            <p className={styles.item}>User</p>
                            <p className={styles.item}>Username</p>
                            <p className={styles.item}>Role</p>
            </div>
            {users.length > 0 ? (
                users.map((u) => (
                        <div className={styles.userCard} key={(u._id)}>
                            <p className={styles.item}>{u.firstName} {u.lastName}</p>
                            <p className={styles.item}>{u.username}</p>
                            <p className={styles.item}>{u.role}</p>
                        </div>
                ))
                
            ) : (
                <p>No users found.</p>
            )}
        </main>
        </div>
)}

export default Dashboard;