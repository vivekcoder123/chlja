import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError]=useState("");
  const [loader,setLoader]=useState(false);
  var token=localStorage.getItem('token');
  if(token!=="undefined" && token!==""){

      props.history.push('/');
  }

  const onSubmit = () => {  
    setLoader(true);
    
    if(email.trim()==="" || password.trim()===""){
      setError("* Email and Password can not be empty");
      setLoader(false);
      return;
    }

    const user = new CognitoUser({ 
      Username: email,
      Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        localStorage.setItem('token',data.accessToken.jwtToken);
        props.history.push('/login');
      },

      onFailure: err => {
        console.error("onFailure:", err);
        setLoader(false);
        setError('* Please Enter Correct Credentials.');
      },

      newPasswordRequired: data => {
        console.log("newPasswordRequired:", data);
      }
    });
  };

  return (
    <div>
    {loader && <div class="ui" >
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Please wait..</div>
      </div>
      </div>
    }

    {!loader &&
      <div class="ui form" style={{margin:"10% 25%"}}>
        <div class="field">
          <label>Email</label>
          <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />

        </div>
        <div class="field">
          <div class="ui">
            <label style={{color:'red'}}>{error}</label>
          </div>
        </div>
        <button class="ui button" onClick={onSubmit}>Login</button>
      </div>
    }
    </div>
  );
};
