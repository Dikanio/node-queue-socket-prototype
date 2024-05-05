import { useState } from 'react';
import io from 'socket.io-client'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Doctor from './pages/doctor';
import Patient from './pages/patient';

const socket = io.connect('http://localhost:4100/', {
  // transports: ['polling'],
  secure: true,
})

// server-side
socket.on("connection", (socket) => {
  console.log('connection')
  console.log(socket); // x8WIv7-mJelg7on_ALbx
});

// client-side
socket.on("connect", () => {
  console.log('connect')
  console.log(socket); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log('disconnect')
  console.log(socket); // undefined
});

function App() {
  const [user, setUser] = useState({
    username: '',
    role: '',
    average_time: 0,
    queue_number: 0
  });
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser} socket={socket} />}></Route>
          <Route path='/patient' element={<Patient user={user} setUser={setUser} socket={socket}/>}></Route>
          <Route path='/doctor' element={<Doctor user={user} setUser={setUser} socket={socket}/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
