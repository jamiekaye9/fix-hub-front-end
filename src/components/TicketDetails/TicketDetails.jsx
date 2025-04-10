import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import * as ticketService from '../../services/ticketService';
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import styles from './TicketDetails.module.css';


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
            <section>
                {ticket === null ? (
                   <p>Loading...</p>
                ) : (
                    <div>
                      {(ticket.openedBy._id === user._id || ticket.assignedTo._id === user._id) && (
                        <div>
                          <section className={styles.buttonContainer}>
                            <h2 className={styles.title}>{ticket.title}</h2>
                            <Link className={styles.edit} to={`/tickets/${ticketId}/edit`}>Edit</Link>
                            <button className={styles.button} onClick={() => props.handleDeleteTicket(ticketId)}>Delete</button>
                          </section>
                          <div className={styles.ticketDetails}>
                              <section className={styles.ticketInfo}>
                                  <h3 className={styles.subTitle}>Details</h3>
                                  <p className={styles.status}>Status: {ticket.status}</p>
                                  <section className={styles.statusRadar}>
                                    <p className={`${styles.statusBox} ${ticket.status === 'open' ? styles.active : ''}`}></p>
                                    <p className={`${styles.statusBox} ${ticket.status === 'inProgress' ? styles.active : ''}`}></p>
                                    <p className={`${styles.statusBox} ${ticket.status === 'resolved' ? styles.active : ''}`}></p>
                                    <p className={`${styles.statusBox} ${ticket.status === 'closed' ? styles.active : ''}`}></p>
                                  </section>
                                  <p>Priority: {ticket.priority}</p>
                                  <p>Assigned to: {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}</p>
                                  <p>Opened by: {ticket.openedBy.firstName} {ticket.openedBy.lastName}</p>
                                  <p>Created at: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                                  <p>Updated at: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
                                  <p>Description:</p>
                                  <p>{ticket.description}</p>
                              </section>
                              <section className={styles.commentSection}>
                                <div className={styles.commentForm}>
                                   <h2 className={styles.subTitle}>Comments</h2>
                                   <CommentForm handleAddComment={handleAddComment} />
                                </div>
                                  {ticket === null ? (
                                      <p>Loading...</p>
                                  ) : (
                                      <div>
                                          {ticket.comments.length === 0 && <p>No comments yet</p>}
                                          {ticket.comments.map((comment) => (
                                              <div key={comment._id} className={styles.commentContainer}>
                                                  <section className=  {styles.comment}>
                                                    <h3>{comment.text}</h3>
                                                    <p>{comment.author.username} - {new Date(comment.createdAt).toLocaleDateString()}</p>
                                                  </section>
                                                  <section className={styles.commentActions}>
                                                    <Link className={styles.subEdit} to={`/tickets/${ticketId}/comments/${comment._id}/edit`}>Edit</Link>
                                                    <button onClick={() => handleDeleteComment(comment._id)} className={styles.commentButton}>Delete</button>
                                                  </section>
                                              </div>
                                          ))}
                                          
                                      </div>
                                  )}
                              </section>
                          </div>                     
                        </div>
                      )}
                    </div>
                )}
            </section>
        </main>
    )
}






export default TicketDetails;