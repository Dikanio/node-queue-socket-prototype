const express = require('express')
const app = express()
const http = require('http');
const cors = require('cors')
const { Server } = require('socket.io')
const leaveRoom = require('./utils/leave-room');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

let doctorList = [];
let userList = [];

let queue = [];
let queueAt = 0;
let completedQueue = [];

const calculateAverageConsultationTime = () => {
  let totalConsultationTime = 0;
  for (let i = 0; i < doctorList.length; i++) {
    totalConsultationTime += doctorList[i].average_time;
  }
  return totalConsultationTime / doctorList.length;
}

const calculateWaitingTime = (patientPosition) => {
  const averageConsultationTime = calculateAverageConsultationTime();
  console.log(averageConsultationTime)
  const waitingTime = averageConsultationTime * (patientPosition - 1);
  console.log(waitingTime)
  return waitingTime;
}

io.on('connection', (socket) => {
    console.log(`User Connected ${socket.id}`)

    socket.on('join_queue', (data) => {
        const { user } = data;
        let __createdtime__ = Date.now();
        if (user.role == 'patient') {
          queueAt++
          user.queue_number = queueAt
          user.estimated_time = calculateWaitingTime(queueAt)
          console.log("HAHAHA: ", user)
          queue.push(user)
          userList.push(user)
          io.sockets.emit('queue_update', {
              userList,
              __createdtime__
          })
        } else if (user.role == 'doctor') {
          doctorList.push({
            username: user.username,
            average_time: user.average_time,
            patient: null
          })
        }
        console.log("Queue: ", queue)
        console.log("Doctor List: ",doctorList)
        io.sockets.emit('doctor_update', {
          doctorList,
          __createdtime__
        })
    })

    socket.on('start_consultation', (data) => {
      const {user} = data;
      const patient = queue[0];        
      doctorList.forEach(doctor => {
        if (doctor.username == user.username) {
          if (doctor.patient) {
            completedQueue.push = doctor.patient
          }
          doctor.patient = {
            ...patient
          }
        }
      })
      queue.forEach((item,index) => {
        item.estimated_time = calculateWaitingTime(index+1)
      })
      io.sockets.emit('doctor_update', {
        doctorList
      })
      io.sockets.emit('queue_update', {
        userList: queue
      })
      queue.splice(0,1)    

    });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
  });
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(4100, () => 'Server is running on port 4100')