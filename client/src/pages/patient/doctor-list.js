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
      <b>Available Doctors</b>
      <hr style={{ border: '1px solid black', width: '100%'}}></hr>
      <div style={{ fontSize: `20px` }}>
        <ul style={{ listStyle: `none`, margin: `0`, padding: `0` }}>
          {doctors.map((doctor, index) => (
            <li
              style={{
                fontWeight: `normal`,
                backgroundColor: `white`,
                padding: '3px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                border: `1px solid black`,
                marginTop: '4px',
                borderRadius: '5px',
              }}
              key={index}
            >
              <span>{doctor.username}</span>
              <span>{doctor.patient?.queue_number ? "No." + doctor.patient?.queue_number : "Available"}</span>
            </li> 
          ))}

          </ul>
      </div>
    </div>
  );
};

export default DoctorList;