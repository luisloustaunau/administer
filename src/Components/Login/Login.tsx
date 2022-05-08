import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

 interface Params {
  username: string, 
  password: string
}


const Login = ({ setAuthenticated } : any) => {

const authorize = ({username, password} :Params) => {
   if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD){
      setAuthenticated(true)
      localStorage.setItem('username', process.env.REACT_APP_USERNAME);
      localStorage.setItem('password', process.env.REACT_APP_PASSWORD);
   } else {
     setError(true)
     setAuthenticated(false)
   }
}

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = async (e: any) => {  
    e.preventDefault();
   authorize({username, password});
  };

  return (
    <div style={styles.app}>
      <div style={styles.form}>
        <form onSubmit={submit}>
          <div>
            <br></br>
            {error ? (
              <>
                <h6 style={{ color: "red" }}>Credentials invalid</h6>
              </>
            ) : (
              ""
            )}
            <br></br>
            <input
              value={username}
              placeholder="email or username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <br></br>
            <input
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <br></br>
            <Button type="submit" variant="primary">
              Log in
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>

      <br />
    </div>
  );
};
/***************************LOGIN PAGE CSS**********************************/
/*Header*/

const styles = {
  app: {
    margin: "auto",
    textAlign: "center" as const,
    width: "50%",
  },
  form: {
    margin: 10,
    border: " solid",
    borderWidth: 1,
    borderColor: "rgb(217, 217, 214)",
    borderRadius: 10,
  },
  button: {
    height: "20px",
    width: "50px",
  },
};

export default Login;
