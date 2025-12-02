const API_URL = process.env.REACT_APP_API_URI;

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const verifyUser = async (token) => {
    const response = await fetch(`${API_URL}/user/finalregister/${token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
};
export default {
    registerUser,
    verifyUser,
  
};
