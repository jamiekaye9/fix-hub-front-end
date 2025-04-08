import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as ticketService from '../../services/ticketService';

const TicketDetails = () => {
    console.log('TicketDetails');
    
    const { ticketId } = useParams();
    console.log(ticketId);
    const [ticket, setTicket] = useState(null);
    console.log("hello");

    useEffect(() => {
        console.log('useEffect');
        
    }, [])
    
    // useEffect(() => {
    //     console.log('useEffect');
    //     const fetchTicket = async () => {
    //         try {
    //             console.log('error fetching ticket with id', ticketId);
                
    //             const ticketData = await ticketService.show(ticketId);
    //             console.log(ticketData);
    //             setTicket(ticketData);
    //         } catch (e) {
    //             console.log(e);
                
    //         }
    //         const ticketData = await ticketService.show(ticketId);
    //         console.log(ticketData);
    //         setTicket(ticketData);
    //     }
    //     if (ticketId) {
    //         fetchTicket();
    //     } else {
    //         console.log('no ticketId');
    //     }
    // }, [ticketId]);

    console.log(ticket);
    
    return (
        <main>
            <section>
                <h2>{ticket.title}</h2>
                <p>{ticket.openedBy.username}</p>
                <p>{ticket.priority}</p>
            </section>
            <section>
                <h2>Comments</h2>
            </section>
        </main>
    )
}

export default TicketDetails;