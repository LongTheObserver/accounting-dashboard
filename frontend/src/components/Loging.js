import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import "./styles.css"; // Ensure this file exists

const Login = () => {
    const [credentials, setCredentials] = useState({ userId: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      if (!credentials.userId || !credentials.password) {
          setError("This field cannot be blank");
          setLoading(false);
          return;
      }
  
      try {
          const data = await loginUser(credentials);
          if (data.token) {
              localStorage.setItem("token", data.token); // ✅ Store token properly
  
              // ✅ Ensure token is set before redirecting
              setTimeout(() => {
                  navigate("/dashboard");
              }, 500); // Wait 500ms to ensure storage
          } else {
              setError("Invalid response from server");
          }
      } catch (err) {
          setError("Invalid credentials");
      } finally {
          setLoading(false);
      }
  };

    return (
        <div className="login-container">
            <img src="/logo.png" alt="JennyAI Logo" className="logo" />
            <Typography variant="h5">Login</Typography>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="User ID" 
                    name="userId"
                    fullWidth 
                    value={credentials.userId} 
                    onChange={handleChange} 
                />
                <TextField 
                    label="Password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    fullWidth 
                    value={credentials.password} 
                    onChange={handleChange} 
                />
                <FormControlLabel 
                    control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />} 
                    label="Show Password"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
