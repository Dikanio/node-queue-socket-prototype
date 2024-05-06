// client/src/pages/chat/index.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Doctor = ({ user, setUser, socket }) => {

  const [time, setTime] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('doctor_update', (data) => {
      console.log("Doctor Update: ", data)
      data.doctorList.forEach(doctor => {
        if (doctor.username == user.username) {
          console.log(doctor)
          setUser(doctor)
        }
      })
    });

    return () => socket.off('doctor_update');
  }, [socket]);

  const nextQueue = () => {
    socket.emit('start_consultation', {user});
  }

  return (
    <div className={styles.container} >
			<div className={styles.formContainer}>
        <h1>{user.patient !== null ? `${user?.patient?.username} - No. ${user?.patient?.queue_number}` : "Empty"}</h1>
				<button onClick={nextQueue} className="btn btn-secondary" style={{ width: '100%' }}>Next</button>
			</div>
		</div>
  );
};

export default Doctor;