import { useEffect, useState } from "react";
import { useUser } from "../../store/UserContext";
import { getApptsByPatient, deleteAppointment } from "../../services/apptServices";
import { DateTime } from "luxon";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ApptCard, ConfirmedSign, AppointmentsContainer} from './Appointments.styled';
import Layout from "../../components/Layout/Layout";

function Appointments() {
  const userInfo = useUser();
  const [patientAppts, setPatientAppts] = useState([]);

  const fetchData = async () => {
    const result = await getApptsByPatient(userInfo.userInfo.id);
    setPatientAppts(result.data.map((item) => {
      return {
        doctorName: item.doctorName,
        doctorSpecialty: item.doctorSpecialty,
        patientId: item.patientId,
        date: DateTime.fromSQL(item.date),
        isConfirmed: item.isConfirmed,
        doctorId: item.doctorId,
        apptId: item.apptId
      }
    }))
  }

  const deleteAppt = (item) => {
    deleteAppointment(item.apptId)
    .then(result => {
      console.log(result)
      fetchData().catch(error => console.log(error))
    })
    
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchData().catch(error => console.log(error))
  }, [userInfo])

  return (
    <Layout>
      <AppointmentsContainer>
      {patientAppts.map((item) => (
        <ApptCard className={item.isConfirmed ? 'confirmed' : 'notConfirmed'}>
          <Card.Body>
            <Card.Title>{item.doctorName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.doctorSpecialty}</Card.Subtitle>
            <Card.Text>{item.date.toLocaleString(DateTime.DATETIME_SHORT)}</Card.Text>
            {item.isConfirmed ? <ConfirmedSign>*** Confirmed ***</ConfirmedSign> : <Button onClick={() => deleteAppt(item)} variant="danger">{'Cancel'}</Button>}
          </Card.Body>
        </ApptCard>
      ))}
      </AppointmentsContainer>
    </Layout>
  );
}

export default Appointments;