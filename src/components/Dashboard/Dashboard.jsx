import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from '../../services/userService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                console.log(fetchedUsers);
            } catch (e) {
                console.log(e);
            }
        }
        if (user) fetchUsers();
    }, [user]);

    return (
        <main>
            <h1>Welcome {user.firstName} {user.lastName}</h1>
            <p>This is your dashboard</p>
        </main>
    )
}

export default Dashboard;