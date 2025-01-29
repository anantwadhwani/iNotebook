import React from 'react';
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const authToken = localStorage.getItem('token');

  const userSignup = async (props) => {
    const { name, email, password } = props;
    await fetch(
      'http://localhost:5000/api/auth/createUser',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      }
    );
  };

  const userLogin = async (props) => {
    const { email, password } = props;
    const authTokenResponse = await fetch(
      'http://localhost:5000/api/auth/userLogin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      }
    );
    return await authTokenResponse.json();
  };

  const getUserData = async () => {
    const userDataResponse = await fetch(
      'http://localhost:5000/api/auth/userData',
      {
        method: 'GET',
        headers: {
          'Auth-Token': authToken
        }
      }
    );
    return (await userDataResponse.json());
  };

  return (
    <AuthContext.Provider value={{userSignup, userLogin, getUserData}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
