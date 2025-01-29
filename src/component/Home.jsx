import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {
  const { setAlert } = props;

  return (
    <>
      <AddNote setAlert={setAlert} />
      <Notes setAlert={setAlert} />
    </>
  )
}

export default Home
