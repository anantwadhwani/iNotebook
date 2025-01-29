import React, { useContext, useRef } from 'react'
import AuthContext from '../context/auth/AuthContext';

const Signup = (props) => {
  const { setAlert } = props;
  const { userSignup } = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (event) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    event.preventDefault();
    userSignup({ name, email, password });
    setAlert({type: 'success', message: `Welcome ${name}`});
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">Name</label>
        <input ref={nameRef} type="text" className="form-control" id="nameInput"/>
      </div>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">Email address</label>
        <input ref={emailRef} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">Password</label>
        <input ref={passwordRef} type="password" className="form-control" id="passwordInput" />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default Signup;
