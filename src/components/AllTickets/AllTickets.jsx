import { Link } from "react-router";

const AllTickets = (props) => {
    const ticketsArray = props.tickets.length
    return (
        <main>
            <h1>All Tickets</h1>
            {ticketsArray === 0 ? (
                <p>No tickets available</p>
            ) : (
                (props.tickets.map((ticket) => (
                    <Link key={ticket._id} to={`/tickets/${ticket._id}`}>
                        {ticket.title}
                    </Link>
                )))
            )} 
        </main>
    )
}

export default AllTickets;