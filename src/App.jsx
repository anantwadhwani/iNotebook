import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/NoteState";
import Alert from "./component/Alert";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message='App' />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home key='home' />} />
            <Route exact path="/about" element={<About key='about' />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
