import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (userId, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { userId, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : "Server Error";
  }
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        return data;
    } else {
        throw new Error(data.message);
    }
};