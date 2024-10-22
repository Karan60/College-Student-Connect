import { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.7), 0 0 10px rgba(0, 0, 255, 0.6),
    0 0 20px rgba(0, 0, 255, 0.5), 0 0 30px rgba(0, 0, 255, 0.4),
    0 0 40px rgba(0, 0, 255, 0.3);
  border-radius: 20px;
`;

const Image = styled("img")({
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "20px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div {
    margin-top: 15px;
  }
  & > button {
    margin-top: 30px;
  }
  & > p {
    margin-top: 25px;
    margin-bottom: -20px;
  }
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = () => {
  const imageUrl = ""; // Add your logo URL here
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState(""); // To hold error messages
  const [success, setSuccess] = useState(""); // To hold success messages

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    if (!signup.name || !signup.username || !signup.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await API.userSignup(signup);
      console.log("API Response:", response);

      if (response.isSuccess) {
        setSuccess("Signup successful!");
        setSignup(signupInitialValues);
      } else {
        setError(response.msg || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup.");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" label="Enter Username" />
            <TextField variant="standard" label="Enter Password" />
            <Button variant="contained">Login</Button>
            <Typography>OR</Typography>
            <button onClick={toggleSignup}>Create an account</button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="password"
              label="Enter Password"
            />
            <Button onClick={signupUser} variant="contained">
              SIGN-UP
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            <Typography>OR</Typography>
            <button onClick={toggleSignup}>Already have an account</button>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
