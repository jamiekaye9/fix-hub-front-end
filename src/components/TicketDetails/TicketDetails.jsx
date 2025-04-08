import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as ticketService from '../../services/ticketService';
import CommentForm from "../CommentForm/CommentForm";

const TicketDetails = () => {
    const { ticketId } = useParams();
    console.log({ticketId});
    
    const [ticket, setTicket] = useState(null);

    

    useEffect(() => {
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

    const handleAddComment = async (commentFormData) => {
        const newComment = await ticketService.createComment(ticketId, commentFormData);
        setTicket({ ...ticket, comments: [...ticket.comments, newComment] });
    }
    

    return (
        <main>
            <h1>Hello</h1>
            <section>
                {ticket === null ? (
                   <p>Loading...</p>
                ) : (
                   <>
                     <h2>{ticket.title}</h2>
                     <h3>{ticket.priority}</h3>
                   </>
                )}
            </section>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {ticket === null ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {ticket.comments.length === 0 && <p>No comments yet</p>}
                        {ticket.comments.map((comment) => (
                            <div key={comment._id}>
                                <h3>{comment.text}</h3>
                                <p>{comment.author.username} - {new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                        
                    </>
                )}
            </section>
        </main>
    )
}






export default TicketDetails;