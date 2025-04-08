import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as ticketService from '../../services/ticketService';

const TicketDetails = () => {
    const { ticketId } = useParams();
    console.log({ticketId});
    
    const [ticket, setTicket] = useState(null);

    console.log(ticket);
    

    useEffect(() => {
        console.log("hello use effect");
        
        const fetchTicket = async () => {
            try {
                const ticketData = await ticketService.show(ticketId);
                setTicket(ticketData);
            } catch (e) {
                console.log(e); 
            }
        }
        fetchTicket();
    } , [ticketId]);

    console.log("ticket", ticket);
    

    return (
        <main>
            <h1>Hello</h1>
            <h2>{ticket.title}</h2>
            <h3>{ticket.description}</h3>
        </main>
    )
}






export default TicketDetails;