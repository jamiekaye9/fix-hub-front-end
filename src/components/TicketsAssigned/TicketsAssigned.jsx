import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const TicketsAssigned = (props) => {
    const { user } = useContext(UserContext);
    const assignedTickets = props.tickets.filter(ticket => ticket.assignedTo === user._id);
    return (
        <main>
            <h1>Tickets Assigned</h1>
            <section>
                {assignedTickets.length === 0 ? (
                    <p>You have no requests.</p>
                ) : (
                    assignedTickets.map((ticket) => (
                        <div key={ticket._id}>
                            <h2>{ticket.title}</h2>
                            <h3>{ticket.priority}</h3>
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}

export default TicketsAssigned;
