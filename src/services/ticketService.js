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
    console.log("inside ticketService", ticketId);
    
    try {
        const res = await fetch(`${BASE_URL}/${ticketId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log("token", token);
        
        return res.json();
    } catch (e) {
        console.log(e);
    }
}

export { index, show, };