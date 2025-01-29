import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../context/auth/AuthContext';

const UserInfo = () => {
  const {getUserData} = useContext(AuthContext);
  const [userData, setUserData ] = useState({});
  const {name, email, date} = userData;

  const handleLogout = () => {
      localStorage.removeItem('token');
  }

  useEffect(()=>{
    (async () => {
      const userDataResponse = await getUserData();
      setUserData(userDataResponse.msg);
    })();
    // eslint-disable-next-line
  },[])

  return (
    <div className="btn-group dropstart">
      <button type="button" className="btn btn-info" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="fa-regular fa-circle-user"></i>
      </button>
      <ul className="dropdown-menu">
        <li><p >Hello {name} </p></li>
        <li><p >Logged in using {email}</p></li>
        <li><p >Using iNotebook since {Number(new Date(date).getMonth()) + 1}/{new Date(date).getUTCFullYear()}</p></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link onClick={handleLogout} className="dropdown-item" to='/login'>Log out</Link></li>
      </ul>
    </div>
  )
}

export default UserInfo
