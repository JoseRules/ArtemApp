import Table from 'react-bootstrap/Table';
import { PageContainer } from './Calendar.styled';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { DateTime } from "luxon";
import { useEffect, useState } from 'react';
import { doctorSchedule } from '../../utils/initialValues';
import Layout from '../../components/Layout/Layout';
import { useUser } from "../../store/UserContext";
import { deleteAppointment, getApptsByDoctor, updateAppointment } from '../../services/apptServices';
import { getUserById } from '../../services/userServices';

function Calendar() {
  const userInfo = useUser();
  const [daysCount, setDaysCount] = useState(0);
  const now = DateTime.now();
  const [tableColumns, setTableColumns] = useState([now.plus({ days: daysCount })]);
  const [patientAppts, setPatientAppts] = useState([]);

  const fetchData = async () => {
    const result = await getApptsByDoctor(userInfo.userInfo.id, now.plus({ days: daysCount }).toISODate());
    setPatientAppts(result.data.map((item) => {
      return { 
        patient: `${item.patientName}`, 
        patientId: item.patientId, 
        date: DateTime.fromSQL(item.date), 
        isConfirmed: item.isConfirmed,
        doctorId: item.doctorId,
        apptId: item.apptId
      }
    }))
  }

  const handleMoveForward = () => {
    setTableColumns([now.plus({ days: daysCount+1 })]);
    setDaysCount(previous => previous + 1)
  }

  const handleMoveBackward = () => {
    setTableColumns([now.plus({ days: daysCount-1 })]);
    setDaysCount(previous => previous -1)
  }

  const confirmAppt = (item) => {
    const updateApptPayload = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      isConfirmed: true,
      date: item.date.toFormat('yyyy-MM-dd HH:mm'),
      apptId: item.apptId
    };
    updateAppointment(updateApptPayload)
      .then(result => {
        console.log(result)
        fetchData().catch(error => console.log(error))
      })
      .catch(error => console.log(error))
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
  }, [userInfo, daysCount])

  return (
    <Layout>
      <PageContainer>
        <Container>
          <Container style={{ display: 'flex', margin: '15px 0' }}>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
              <Button variant="primary" onClick={handleMoveBackward}>{'<'}</Button>
            </Container>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{now.plus({ days: daysCount }).toFormat('EEEE, MMMM dd')}</Container>
            <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" onClick={handleMoveForward}>{'>'}</Button>{' '}

            </Container>
          </Container>
        </Container>
        <Container>
        <Table >
          <tbody>
            {

              doctorSchedule.map(item =>
                <tr>
                  <td>{item}</td>
                  {tableColumns.map(tableColumn => {
                    const result = patientAppts.filter(element => {
                      return tableColumn.hasSame(element.date, 'day') && element.date.toFormat('HH:mm') === item
                    });
                    if (result.length > 0) {
                      return (<th>
                        <Alert key={'success'} variant={result[0].isConfirmed ? 'success' :'primary'} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '350px'}}>
                          {`${result[0].patient}`}
                          {!result[0].isConfirmed && <div>
                            <Button onClick={() => confirmAppt(result[0])} style={{marginRight: '15px'}} variant="success">{'Confirm'}</Button>
                            <Button onClick={() => deleteAppt(result[0])} variant="danger">{'Delete'}</Button>
                          </div>}
                        </Alert>
                      </th>)
                    } else {
                      return (<th>

                      </th>)
                    };

                  })}



                </tr>)
            }

          </tbody>
        </Table>
        </Container>
      </PageContainer>
    </Layout>
  );
}

export default Calendar;