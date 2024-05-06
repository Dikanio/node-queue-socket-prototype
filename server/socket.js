const { Server } = require('socket.io');
const Doctor = require('./modules/doctor/doctor');

const io = new Server({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
let userList = [];

let queue = [];
let queueAt = 0;
let completedQueue = [];

const setupSocket = (server) => {
  io.attach(server);
  io.on('connection', (socket) => {
    console.log(`Client Connected ${socket.id}`)
  
    socket.on('join_queue', (data) => {
        const { user } = data;
        let __createdtime__ = Date.now();
        if (user.role == 'patient') {
          queueAt++
          user.queue_number = queueAt
          user.estimated_time = Doctor.calculateWaitingTime(queueAt)
          console.log("HAHAHA: ", user)
          queue.push(user)
          userList.push(user)
          io.sockets.emit('queue_update', {
              userList,
              __createdtime__
          })
        } else if (user.role == 'doctor') {
          new Doctor(user.username, user.average_time, null);
        }
        console.log("Queue: ", queue)
        console.log("Doctor List: ",Doctor.getDoctorList())
        io.sockets.emit('doctor_update', {
          doctorList: Doctor.getDoctorList(),
          __createdtime__
        })
    })
  
    socket.on('start_consultation', (data) => {
      const {user} = data;
      const patient = queue[0];        
      Doctor.getDoctorList().forEach(doctor => {
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
    console.log('Client disconnected from the socket');
  });
  })
}

module.exports = { io, setupSocket };