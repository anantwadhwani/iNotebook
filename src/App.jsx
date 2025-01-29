import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import NoteState from "./context/note/NoteState";
import AuthState from "./context/auth/AuthState";

function App() {
  const [alert, setAlert] = useState({type: null, message: ''});
  setTimeout(()=>{
    setAlert({type: '', message: ''})
  }, 2000);
  return (
    <AuthState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home key='home' setAlert={setAlert} />} />
              <Route exact path="/login" element={<Login key='login' setAlert={setAlert} />} />
              <Route exact path="/signup" element={<Signup key='signup' setAlert={setAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;
