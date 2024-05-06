// client/src/pages/chat/index.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import DoctorList from './doctor-list';
import Countdown from 'react-countdown';

const Patient = ({ user, setUser, socket }) => {

  const [time, setTime] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('queue_update', (data) => {   
      const {userList} = data
      userList.forEach(item => {
        if (user.username === item.username) {
          setUser(item)
          setTime(item.estimated_time)
        }
      });      
    });

	// Remove event listener on component unmount
    return () => socket.off('queue_update');
  }, [socket]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>


      {/* Add this */}
      {/* <DoctorList socket={socket}></DoctorList> */}

      <div style={{ display:'flex', width: '800px'}}>
        <div className={styles.doctorWrapper}>
          <DoctorList socket={socket} user={user} setUser={setUser}></DoctorList>
        </div>

        <div className={styles.patientWrapper}>
          <div style={{ display: 'flex'}}>
            {/* que number */}
            <div style={{ padding: '10px', border: '1px solid black', background: 'rgb(0, 24, 111)', width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: '5px'}}>
              <h1 style={{ color: 'white'}}>{user.queue_number}</h1>
            </div>

            <div style={{ marginLeft: '20px'}}>
              <h1>{user.username}</h1> 
            </div>

              {/* <div>
                <h1>{user.username} - {user.queue_number} - {user.estimated_time}</h1>
              </div> */}
          </div>

          <div style={{ marginTop: '20px', background: "rgb(0, 24, 111)", color: 'white', padding: '10px', border: '1px solid black', borderRadius: '5px'}}>
            <b>Estimated Time</b>
            <div style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              {/* <Countdown date={Date.now() + ( time * 60000 )} /> */}
              {time} minutes
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default Patient;