import { PageContainer } from "./Catalog.styled";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import { getAllDoctors } from "../../services/userServices";
import { apptsArray, availApptsArray, initialUserState } from "../../utils/initialValues";
import { specialties } from "../../assets/data/specialties";
import Modal from 'react-bootstrap/Modal';
import { DateTime } from "luxon";
import { getApptsByDoctor, setUpAppointment } from "../../services/apptServices";
import { filterAppts } from "../../utils/processes";
import { useUser } from "../../store/UserContext";
import Layout from "../../components/Layout/Layout";

function Catalog() {
  const [daysCount, setDaysCount] = useState(0);
  const [doctors, setDoctors] = useState([initialUserState.userInfo]);
  const [filteredDoctors, setFilteredDoctors] = useState([initialUserState.userInfo]);
  const [showModal, setShowModal] = useState(false);
  const [showSecModal, setShowSecModal] = useState(false);
  const [apptsAvail, setApptsAvail] = useState(availApptsArray);
  const [currentDoctorID, setCurrentDoctorID] = useState(0);
  const [chosenAppt, setChosenAppt] = useState('');
  const now = DateTime.now();
  const userData = useUser();
  const { id } = userData.userInfo;

  const filterDoctors = e => {
    setFilteredDoctors(doctors.filter(item => item.specialty === e.target.value));
  }

  const getAnAppointment = (id, isNew, dayCount) => {
    if (isNew) { setDaysCount(0) }
    setCurrentDoctorID(id);
    getApptsByDoctor(id, now.plus({ days: isNew ? 0 : dayCount }).toISODate())
      .then(result => {
        setApptsAvail(filterAppts(availApptsArray, result.data));
        setShowModal(true)
        console.log(result.data)
      })
      .catch(error => console.log(error))
  }

  const handleDateChange = (newDayCount) => {
    setDaysCount(newDayCount);
    getAnAppointment(currentDoctorID, false, newDayCount);
  }

  const handleChoseAppt = (chosenAppointment) => {
    setChosenAppt(chosenAppointment);
    setShowSecModal(true);
  }
  //TO DO
  const setUpAppt = () => {
    const setUpApptPayload = {
      doctorId: currentDoctorID,
      patientId: id,
      isConfirmed: false,
      date: `${now.plus({ days: daysCount }).toISODate()} ${chosenAppt}`
    };
    setUpAppointment(setUpApptPayload)
      .then(result => {
        setShowSecModal(false);
        setShowModal(false);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllDoctors()
      .then(result => {
        setFilteredDoctors(result.data);
        setDoctors(result.data);
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Layout>
      <PageContainer className={filteredDoctors.length < 1 ? 'empty' : ''}>
        <Container style={{ width: '18rem', marginTop: '20px' }}>
          <Form.Group className="mb-3">
            <Form.Select id="disabledSelect" onChange={filterDoctors}>
              <option value={"none"} hidden selected>Filter By Specialty</option>
              {
                specialties.map(specialty => <option value={specialty}>{specialty}</option>)
              }
            </Form.Select>
          </Form.Group>
        </Container>


        <Container>
          <Row style={{ justifyContent: 'center' }}>
            {filteredDoctors.map((doctor, index) => (<Card style={{ width: '18rem', margin: '18px 15px 20px 0' }} key={`doctor${index}`}>
              <Card.Img variant="top" src={doctor.profilePicUrl} style={{height: "250px"}}/>
              <Card.Body>
                <Card.Title>{`${doctor.firstname} ${doctor.lastname}`}</Card.Title>
                <Card.Text className="mb-0"><strong>{doctor.specialty}</strong></Card.Text>
                <Card.Text className="mb-0"><strong>Experience:</strong> {doctor.experience}</Card.Text>
                <Card.Text className="mb-0"><strong>Price:</strong> {doctor.price}</Card.Text>
                <Card.Text className="mb-3"><strong>Languages:</strong> {doctor.languages}</Card.Text>
                <Button variant="primary" onClick={() => getAnAppointment(doctor.id, true, 0)}>Get an Appointment</Button>
              </Card.Body>
            </Card>))}

            {filteredDoctors.length < 1 && <div>No doctors to show</div>}

          </Row>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Set an appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ display: 'flex', margin: '15px 0' }}>
              Select the appointment that best fits you
            </Container>
            <Container style={{ display: 'flex', margin: '15px 0' }}>
              <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Button variant="primary" onClick={() => handleDateChange(daysCount - 1, false)}>{'<'}</Button>
              </Container>
              <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {`${now.plus({ days: daysCount }).toFormat('EEE, MMM dd')}`}
              </Container>
              <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={() => handleDateChange(daysCount + 1, false)}>{'>'}</Button>{' '}

              </Container>
            </Container>
            <Container style={{ display: 'block', margin: '15px 0' }}>
              {
                apptsAvail.map(item =>
                  <>
                    <Button variant="info" onClick={() => { handleChoseAppt(item) }} style={{ fontSize: '20px', width: 'calc(50% - 10px)', margin: '5px 0' }}>{item}</Button>{' '}
                  </>
                )
              }
            </Container>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showSecModal} onHide={() => setShowSecModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm selected appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ display: 'flex', margin: '15px 0' }}>
              Are you sure you would like to schedule an appointment for {`${now.plus({ days: daysCount }).toFormat('EEE, MMM dd')}`} at {chosenAppt} hrs
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={setUpAppt}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setShowSecModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </PageContainer>
    </Layout>
  )
}

export default Catalog;