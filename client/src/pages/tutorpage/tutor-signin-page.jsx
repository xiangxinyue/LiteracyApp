import React from "react";
import axios from "axios";
import {
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
} from "@material-ui/core";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSignIn = async () => {
    const { email, password } = this.state;
    const doc = await axios.post("/auth/tutor", {
      email,
      password,
    });
    if (doc.data.msg === true) window.location = "/";
  };

  render() {
    const { email, password } = this.state;
    return (
      <div style={{ position: "relative", top: 70 }}>
        <Container className="text-center">
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: 40 }}>
              Tutor Signin
            </Typography>
            <TextField
              id="standard-basic"
              label="Email"
              style={{ width: 300, marginTop: 10 }}
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              style={{ width: 300, marginTop: 10 }}
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: 300,
                height: 50,
                marginTop: 10,
                backgroundColor: "#0F9D58",
              }}
              onClick={this.handleSignIn}
            >
              Sign In
            </Button>
          </CardContent>
        </Container>
      </div>
    );
  }
}

export default SignIn;
