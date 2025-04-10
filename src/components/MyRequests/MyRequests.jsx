import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router';
import styles from './MyRequests.module.css';

const MyRequests = (props) => {
    const { user } = useContext(UserContext);
    const requests = props.tickets.filter(ticket => ticket.openedBy._id === user._id);
    return (
        <main>
        <h1 className={styles.title}>All Tickets</h1>
        {requests.length === 0 ? (
            <p>No requests available</p>
        ) : (
            <div className={styles.cardGrid}>
                <div className={styles.headerCard}>
                    <p className={styles.itemTitle}>Title</p>
                    <p className={styles.item}>Status</p>
                    <p className={styles.item}>Priority</p>
                    <p className={styles.item}>Type</p>
                    <p className={styles.item}>Technology</p>
                    <p className={styles.item}>Opened By</p>
                    <p className={styles.item}>Assigned To</p>
                    <p className={styles.item}>Created</p>
                    <p className={styles.item}>Updated</p>
                </div>
                {requests.map((ticket) => (
                    <div key={ticket._id} className={styles.ticketCard}>
                        <h2 className={styles.itemTitle}>
                            <Link className={styles.link} to={`/tickets/${ticket._id}`}>
                                {ticket.title}
                            </Link>
                        </h2>
                        <p className={styles.item}>{ticket.status}</p>
                        <p className={styles.item}>{ticket.priority}</p>
                        <p className={styles.item}>{ticket.type}</p>
                        <p className={styles.item}>{ticket.technology}</p>
                        <p className={styles.item}>{ticket.openedBy?.username || 'Unknown'}</p>
                        <p className={styles.item}>{ticket.assignedTo?.username || 'Unassigned'}</p>
                        <p className={styles.item}>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                        <p className={styles.item}>{new Date(ticket.updatedAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        )}
    </main>
)
}

export default MyRequests;