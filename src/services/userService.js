const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    if (data.e) {
      throw new Error(data.e);
    }
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export { index };
