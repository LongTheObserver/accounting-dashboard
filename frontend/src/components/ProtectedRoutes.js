import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setToken(localStorage.getItem("token")); // ✅ Ensure token is updated
    }, []);

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
