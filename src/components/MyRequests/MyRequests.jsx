import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import styles from "./MyRequests.module.css";

const MyRequests = (props) => {
  const { user } = useContext(UserContext);
  const requests = props.tickets.filter(
    (ticket) => ticket.openedBy._id === user._id
  );
  const capitalise = (word) => word?.charAt(0).toUpperCase() + word?.slice(1);
  const splitCamelCase = (str) => {
    if (typeof str !== "string") return "";
    return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  };
  return (
    <main>
      <h1 className={styles.title}>My Requests</h1>
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
          <div className={styles.ticketCardContainer}>
            {requests.map((ticket) => (
              <div key={ticket._id} className={styles.ticketCard}>
                <h2 className={styles.itemTitleLink}>
                  <Link className={styles.link} to={`/tickets/${ticket._id}`}>
                    {ticket.title}
                  </Link>
                </h2>
                <p className={styles.item}>
                  {splitCamelCase(capitalise(ticket.status))}
                </p>
                <p className={styles.item}>{capitalise(ticket.priority)}</p>
                <p className={styles.item}>{capitalise(ticket.type)}</p>
                <p className={styles.item}>{capitalise(ticket.technology)}</p>
                <p className={styles.item}>
                  {ticket.assignedTo
                    ? `${ticket.openedBy.firstName} ${ticket.openedBy.lastName}`
                    : "Unassigned"}
                </p>
                <p className={styles.item}>
                  {ticket.assignedTo
                    ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                    : "Unassigned"}
                </p>
                <p className={styles.item}>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
                <p className={styles.item}>
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default MyRequests;
