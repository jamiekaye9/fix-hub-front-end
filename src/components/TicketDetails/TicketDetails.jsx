import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import * as ticketService from '../../services/ticketService';
import * as userService from '../../services/userService';
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const TicketDetails = (props) => {
    const { ticketId } = useParams();
    const { user } = useContext(UserContext);
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const ticketData = await ticketService.show(ticketId);
                console.log('ticket fetch', ticketData);
                
                setTicket(ticketData);
                console.log('ticket updated', ticket);
                
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

    const handleDeleteComment = async (commentId) => {
        const deleteComment = await ticketService.deleteComment(ticketId, commentId);
        setTicket({ ...ticket, comments: ticket.comments.filter((comment) => comment._id !== commentId) });
    }
 
    return (
        <main>
            <h1>Hello</h1>
            <section>
                {ticket === null ? (
                   <p>Loading...</p>
                ) : (
                    <>
                      <section>
                        <h2>{ticket.title}</h2>
                        <h3>{ticket.priority}</h3>
                      </section>
                      {ticket.openedBy._id === user._id && (
                        <section>
                            <Link to={`/tickets/${ticketId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteTicket(ticketId)}>Delete</button>
                        </section>
                      )}
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
                                <Link to={`/tickets/${ticketId}/comments/${comment._id}/edit`}>Edit</Link>
                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                            </div>
                        ))}
                        
                    </>
                )}
            </section>
        </main>
    )
}






export default TicketDetails;