const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tickets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (e) {
        console.log(e);
    }
};

const show = async (ticketId) => {
    try {
        const res = await fetch(`${BASE_URL}/${ticketId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (e) {
        console.log(e);
    }
}

const create = async (ticketFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketFormData),
        })
        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export { index, show, create };