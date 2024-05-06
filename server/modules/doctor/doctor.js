class Doctor {
  static doctorList = [];

  constructor(username, average_time, patient) {
      this.username = username;
      this.average_time = average_time;
      this.patient = patient;
      Doctor.doctorList.push(this);
  }

  static getDoctorList() {
      return Doctor.doctorList;
  }

  static calculateWaitingTime(patientPosition) {
    let totalConsultationTime = 0;
    for (let i = 0; i < this.doctorList.length; i++) {
      totalConsultationTime += this.doctorList[i].average_time;
    }
    const doctorAverageConsultationTime = totalConsultationTime / this.doctorList.length
    console.log(doctorAverageConsultationTime)
    const waitingTime = doctorAverageConsultationTime * (patientPosition - 1);
    console.log(waitingTime)
    return waitingTime;
  }
}

module.exports = Doctor