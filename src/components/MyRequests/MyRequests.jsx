import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const MyRequests = (props) => {
    const { user } = useContext(UserContext);
    const requests = props.tickets.filter(ticket => ticket.openedBy._id === user._id);
    return (
        <main>
            <h1>My Requests</h1>
            <section>
                {requests.length === 0 ? (
                    <p>You have no requests.</p>
                ) : (
                    requests.map((ticket) => (
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

export default MyRequests;