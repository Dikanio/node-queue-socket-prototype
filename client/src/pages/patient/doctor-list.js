// client/src/pages/chat/room-and-users.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ socket }) => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('doctor_update', (data) => {
      console.log("Doctor Update: ", data)
      setDoctors(data.doctorList)
    });

    return () => socket.off('doctor_update');
  }, [socket]);

  return (
    <div className={styles.doctorList}>

      <div>
        <ul className={styles.usersList}>
          {doctors.map((doctor, index) => (
            <li
              style={{
                fontWeight: `normal`,
              }}
              key={index}
            >
              {doctor.username} - {doctor.patient?.queue_number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorList;