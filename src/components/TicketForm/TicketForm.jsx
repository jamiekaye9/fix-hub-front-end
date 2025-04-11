import { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import * as ticketService from "../../services/ticketService";
import styles from "./TicketForm.module.css";
import * as userService from "../../services/userService";

const TicketForm = (props) => {
  const { ticketId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    type: "",
    technology: "",
    status: "",
    assignedTo: "",
  });
  const [serviceDesk, setServiceDesk] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      const ticketData = await ticketService.show(ticketId);
      setFormData({
        ...ticketData,
        assignedTo: ticketData.assignedTo?._id || ticketData.assignedTo || "",
      });
    };
    if (ticketId) fetchTicket();
    return () =>
      setFormData({
        title: "",
        description: "",
        priority: "",
        type: "",
        technology: "",
      });
  }, [ticketId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await userService.index();
      console.log("allusers", allUsers);
      const serviceDesk = allUsers.filter(
        (user) => user.role === "serviceDesk"
      );
      setServiceDesk(serviceDesk);
    };
    fetchUsers();
    console.log(serviceDesk);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticketId) {
      props.handleUpdateTicket(ticketId, formData);
    } else {
      props.handleAddTicket(formData);
    }
  };

  return (
    <main className={styles.ticketForm}>
      <h1 className={styles.title}>
        {ticketId ? "Edit Ticket" : "Create a Ticket"}
      </h1>
      <form className={styles.formItems} onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="priority" className={styles.label}>
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={styles.div}>
          <label htmlFor="type" className={styles.label}>
            Type
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
          </select>
        </div>
        <div className={styles.div}>
          <label htmlFor="technology" className={styles.label}>
            Technology
          </label>
          <input
            type="text"
            name="technology"
            id="technology"
            value={formData.technology}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        {ticketId && (
          <>
            <div className={styles.div}>
              <label htmlFor="status" className={styles.label}>
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="open">Open</option>
                <option value="inProgress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className={styles.div}>
              <label htmlFor="assignedTo" className={styles.label}>
                Assigned To
              </label>
              <select
                name="assignedTo"
                id="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                className={styles.input}
              >
                {serviceDesk.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        )}
        <div className={styles.div}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className={styles.inputBox}
          />
        </div>
        <div className={styles.buttonDiv}>
          <button type="submit" className={styles.button}>
            {!ticketId ? "Create Ticket" : "Update"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default TicketForm;
