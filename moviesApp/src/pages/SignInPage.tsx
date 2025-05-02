import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

interface SignInResponse {
    message: string;
    token: string;
  }
  
const SignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post<SignInResponse>(
        "https://90f9e12fo5.execute-api.eu-west-1.amazonaws.com/prod/auth/signin",
        { username, password }
      );

      const { token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      const identityPoolId = "eu-west-1:0374f1d3-94a9-49eb-8004-0f3135625c2a";
      const credentials = fromCognitoIdentityPool({
        clientConfig: { region: "eu-west-1" },
        identityPoolId,
        logins: {
          "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_qSJ2S2w7W": token,
        },
      });
      
       const awsCreds = await credentials();
       localStorage.setItem("awsCredentials", JSON.stringify(awsCreds));
      
      alert("Signed in successfully!");
      navigate("/");
    } catch (err: any) {
      setError("Sign in failed. Please check your username and password.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;
