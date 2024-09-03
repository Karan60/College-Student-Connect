import { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";

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
`
const signupInitialValues ={
name:'',
username:'',
password:''
}

const Login = () => {
  const imageUrl = "https://www.imghippo.com/i/8aJJX1724907268.png";
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange =(e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" label="Enter Username" />
            <TextField variant="standard" label="Enter Password" />
            <Button variant="contained">login</Button>
            <Typography>OR</Typography>
            <button onClick={() => toggleSignup()}>Create an account</button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name'label="Enter Name" />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username'label="Enter Username" />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password'label="Enter Password" />
            <Button variant="contained">SIGN-UP</Button>
            <Typography>OR</Typography>
            <button variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </button>
          </Wrapper>
        )}
      </Box>
    </Component>
  ); 
};

export default Login;