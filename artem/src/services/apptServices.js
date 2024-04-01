import axios from "axios"

const artemAPIURL = 'http://localhost:4000';

export const getApptsByDoctor = (doctorId, date) => {
    return axios.post(`${artemAPIURL}/appointmentsByDoctor`, {
        userId: doctorId,
        date
      });
}

export const getApptsByPatient = (patientId) => {
    return axios.post(`${artemAPIURL}/appointmentsByPatient`, {
        userId: patientId
      });
}

export const setUpAppointment = ({doctorId, patientId, isConfirmed, date}) => {
    return axios.post(`${artemAPIURL}/appointments`, {
        doctorId, patientId, isConfirmed, date
    });
}

export const updateAppointment = ({doctorId, patientId, isConfirmed, date, apptId}) => {
    return axios.post(`${artemAPIURL}/appointments`, {
        doctorId, patientId, isConfirmed, date, apptId
    });
}

export const deleteAppointment = (appointmentId) => {
    return axios.post(`${artemAPIURL}/deleteAppt`, { appointmentId });
}