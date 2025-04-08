import { useState } from "react";

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: ''})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleAddComment(formData)
        setFormData({ text: '' })
    }

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
