import React, { useContext, useRef } from 'react'
import AuthContext from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const { setAlert } = props;
    const { userLogin } = useContext(AuthContext);
    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = async (event) => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        event.preventDefault();
        const loginResponse = await userLogin({ email, password });
        emailRef.current.value = '';
        passwordRef.current.value = '';
        if (loginResponse.statusMessage === 'success') {
            setAlert({type: 'success', message: 'Welcome'});
            localStorage.setItem('token', loginResponse.msg);
            navigate('/');
        } else {
            setAlert({type: 'danger', message: 'Invalid credentials'});
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <input ref={emailRef} type="email" className="form-control" id="emailInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="passwordInput" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}

export default Login
