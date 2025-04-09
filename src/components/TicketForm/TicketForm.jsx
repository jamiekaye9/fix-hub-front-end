import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as ticketService from "../../services/ticketService";

const TicketForm = (props) => {
    const { ticketId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        type: "software",
        technology: "",
    })

    useEffect(() => {
        const fetchTicket = async () => {
            const ticketData = await ticketService.show(ticketId);
            setFormData(ticketData)
        }
        if (ticketId) fetchTicket();
        return () => setFormData({
            title: "",
            description: "",
            priority: "low",
            type: "software",
            technology: "",
        })
    } , [ticketId]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
}

const handleSubmit = (e) => {
    e.preventDefault()
    if (ticketId) {
        props.handleUpdateTicket(ticketId, formData)
    } else { 
        props.handleAddTicket(formData)
    }
}

return (
    <main>
        <h1>{ticketId ? 'Edit Ticket' : 'Create a Ticket'}</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                </select>
            </div>
            <div>
                <label htmlFor="technology">Technology</label>
                <input
                    type="text"
                    name="technology"
                    id="technology"
                    value={formData.technology}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Create Ticket</button>
            </div>
        </form>
    </main>
)}

export default TicketForm;