import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as ticketService from "../../services/ticketService";


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: ''})
    const { ticketId, commentId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (ticketId && commentId) {
            const updatedComment = await ticketService.updateComment(ticketId, commentId, formData)
            console.log('updated comment');
            
            navigate(`/tickets/${ticketId}`)
        } else {
            console.log('new comment');
            
            props.handleAddComment(formData)
        }
        console.log(formData);
        
        setFormData({ text: '' })
    }

    useEffect(() => {
        const fetchTicket = async () => {
            const ticketData = await ticketService.show(ticketId);
            const commentData = ticketData.comments.find(comment => comment._id === commentId);
            setFormData(commentData)
        }
        if (ticketId && commentId) fetchTicket();
    }, [ticketId, commentId]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="text">Comment</label>
                <textarea
                    type="text"
                    name="text"
                    id="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default CommentForm;
