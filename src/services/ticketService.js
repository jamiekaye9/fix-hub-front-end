const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tickets`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const show = async (ticketId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const create = async (ticketFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketFormData),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const createComment = async (ticketId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    if (res.status === 204) {
      return { message: "Ticket deleted successfully" };
    }
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const updateTicket = async (ticketId, ticketFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketFormData),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (ticketId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    if (res.status === 204) {
      return { message: "Comment deleted successfully" };
    }
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const updateComment = async (ticketId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const myRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-requests`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const ticketsAssigned = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tickets-assigned`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export {
  index,
  show,
  create,
  createComment,
  deleteTicket,
  updateTicket,
  deleteComment,
  updateComment,
  myRequests,
  ticketsAssigned,
};
