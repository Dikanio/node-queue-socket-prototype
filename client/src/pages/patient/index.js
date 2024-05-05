// client/src/pages/chat/index.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import DoctorList from './doctor-list';

const Patient = ({ user, setUser, socket }) => {

  const [time, setTime] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('queue_update', (data) => {   
      const {userList} = data
      userList.forEach(item => {
        if (user.username === item.username) {
          setUser(item)
        }
      });      
    });

	// Remove event listener on component unmount
    return () => socket.off('queue_update');
  }, [socket]);

  return (
    <div className={styles.chatContainer}>
      {/* Add this */}
      <DoctorList socket={socket}></DoctorList>
      <div>
        <h1>{user.username} - {user.queue_number} - {user.estimated_time}</h1>
      </div>
    </div>
  );
};

export default Patient;