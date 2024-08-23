import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { CenteredCol, FormHeading, FormTitle, LoginRedirect, UserTypeRow, SignUpContainer, MobileDivider } from './SignUp.styled';
import FileInput from '../../components/FileInput/FileInput';
import { useState, useEffect } from 'react';
import { specialties } from '../../assets/data/specialties';
import { registerDoctor, registerPatient } from '../../services/userServices';
import validations from '../../utils/validations';
import { initialTouchedValues, initialInputValues, initialModalInfo } from '../../utils/initialValues';
import Modal from '../../components/Modal/Modal';
import { useUpdateUser, useUser } from '../../store/UserContext';
import { saveSessionStorage } from '../../utils/getSessionStorage';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const SignUp = () => {
  const [userType, setUserType] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [form, setForm] = useState(initialInputValues);
  const [valid, setValid] = useState({ gender: true, firstname: false });
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [touched, setTouched] = useState(initialTouchedValues);
  const [modal, setModal] = useState(initialModalInfo);
  const updateUser = useUpdateUser();
  const user = useUser();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModal(initialModalInfo);
  }

  const throwModal = (type) => {
    switch (type) {
      case 'emailRegistered':
        setModal({
          open: true,
          title: 'Email already registered!',
          text: 'Please login or try with another email.',
          buttonlink: '/login',
          buttonText: 'Login'
        });
        break;
      case 'userNotFound':
        setModal({
          open: true,
          title: 'Email or password is incorrect!',
          text: 'Please try again or hit Sign Up button.',
          buttonlink: '/signUp',
          buttonText: 'Sign Up'
        });
        break;
      default:
        break;
    }
  }

  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    setValid({ ...valid, [field]: validations[field](value) })
    !touched[field] && setTouched({ ...touched, [field]: true })
  }

  const evaluateForm = () => {
    const baseFormValid = valid.firstname && valid.lastname && valid.dateOfBirth && valid.phoneNumber && valid.email && valid.password && valid.passwordConfirmation && userType !== "";
    if (userType === 'doctor') {
      setSubmitEnabled(baseFormValid && valid.npi && valid.experience && valid.price && valid.location && valid.languages);
      return;
    }
    setSubmitEnabled(baseFormValid);
  }

  const handleBlur = field => {
    !touched[field] && setTouched({
      ...touched,
      [field]: true
    })
  }

  const registerUser = (e) => {
    e.preventDefault();
    const formToSend = { ...form, profilePicUrl: profileImage };
    if (userType === 'doctor') {
      registerDoctor(formToSend)
        .then(res => {
          console.log("Doctor successfully Registered");
          const state = { ...user, userInfo: { ...user.userInfo, ...form, type: 'doctor' } };
          updateUser(state);
          saveSessionStorage(state);
          navigate('/profile');
        })
        .catch(err => {
          console.log(err);
          throwModal('emailRegistered');
        });
    } else {
      registerPatient(formToSend)
        .then(res => {
          console.log("Patient successfully Registered");
          const state = { ...user, userInfo: { ...user.userInfo, ...form, type: 'patient', profilePicUrl:  profileImage} };
          updateUser(state);
          saveSessionStorage(state);
          navigate('/profile');
        })
        .catch(err => {
          console.log(err);
          throwModal('emailRegistered');
        });
    }

  }

  useEffect(() => {
    evaluateForm();
  }, [form]);

  return (
    <Layout>
      <SignUpContainer>
        <Modal showModal={modal.open} title={modal.title} text={modal.text} closeModal={handleCloseModal} buttonText={modal.buttonText} buttonlink={modal.buttonlink} />
        <Form onSubmit={registerUser}>
          <FormHeading>
            <Col>
              <Row>
                <FormTitle>Create your free account</FormTitle>
              </Row>
              <Row>
                <LoginRedirect><a href="/login">Already have an account?</a> </LoginRedirect>
              </Row>
            </Col>
          </FormHeading>
          <Container className='mt-4'>
            <Row>
              <Col md={2}></Col>
              <CenteredCol md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={profileImage || "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"} roundedCircle width={150} />
              </CenteredCol>
              <MobileDivider />
              <CenteredCol md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileInput onImageChange={(newURL) => setProfileImage(newURL)} />
              </CenteredCol>
            </Row>
          </Container>
          <Row className='mt-4'>
            <Col md={2}></Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>First Name *</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstname" id='firstname' onChange={(e) => setField('firstname', e.target.value)} onBlur={() => handleBlur('firstname')} />
                {(!valid.firstname && touched.firstname) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
            <MobileDivider />
            <Col md={4}>
              <Form.Group>
                <Form.Label>Last Name *</Form.Label>
                <Form.Control type="text" placeholder="Last Name" onChange={(e) => setField('lastname', e.target.value)} onBlur={() => handleBlur('lastname')} />
                {(!valid.lastname && touched.lastname) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={2}></Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date of Birth *</Form.Label>
                <Form.Control type="date" onChange={(e) => setField('dateOfBirth', e.target.value)} onBlur={() => handleBlur('dateOfBirth')} />
                {(!valid.dateOfBirth && touched.dateOfBirth) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
            <MobileDivider />
            <Col md={4}>
              <Form.Group>
                <Form.Label>Gender *</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setField('gender', e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={2}></Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Cell Phone *</Form.Label>
                <Form.Control type="text" placeholder="Cell Phone" onChange={(e) => setField('phoneNumber', e.target.value)} onBlur={() => handleBlur('phoneNumber')} />
                {(!valid.phoneNumber && touched.phoneNumber) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
            <MobileDivider />
            <Col md={4}>
              <Form.Group>
                <Form.Label>Email *</Form.Label>
                <Form.Control type="text" placeholder="Email" onChange={(e) => setField('email', e.target.value)} onBlur={() => handleBlur('email')} />
                {(!valid.email && touched.email) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <UserTypeRow className='mt-4'>
            <Col md={12}>
              <Form.Label>Are you? *{'   '}</Form.Label><br />
              <Form.Check inline custom type="radio" id="custom-radio" label="Patient" checked={userType === 'patient'} onClick={() => setUserType('patient')} />
              <Form.Check inline custom type="radio" id="custom-radio2" label="Doctor" checked={userType === 'doctor'} onClick={() => setUserType('doctor')} />
              <br />
              {userType === '' && touched.password && <Form.Text className="text-danger">This field is required.</Form.Text>}
            </Col>
          </UserTypeRow>
          {userType === 'doctor' &&
            <>
              <Row className='mt-4'>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Specialty *</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setField('specialty', e.target.value)}>
                      {
                        specialties.map(specialty => <option value={specialty}>{specialty}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <MobileDivider />
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>NPI *</Form.Label>
                    <Form.Control type="text" placeholder="1234567890" onChange={(e) => setField('npi', e.target.value)} onBlur={() => handleBlur('npi')} />
                    {(!valid.npi && touched.npi) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Experience *</Form.Label>
                    <Form.Control type="text" placeholder="Years" onChange={(e) => setField('experience', e.target.value)} onBlur={() => handleBlur('experience')} />
                    {(!valid.experience && touched.experience) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                  </Form.Group>
                </Col>
                <MobileDivider />
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Consulting Price *</Form.Label>
                    <Form.Control type="text" placeholder="$" onChange={(e) => setField('price', e.target.value)} onBlur={() => handleBlur('price')} />
                    {(!valid.price && touched.price) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Location *</Form.Label>
                    <Form.Control type="text" placeholder="Address" onChange={(e) => setField('location', e.target.value)} onBlur={() => handleBlur('location')} />
                    {(!valid.location && touched.location) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                  </Form.Group>
                </Col>
                <MobileDivider />
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Languages *</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(e) => setField('languages', e.target.value)} onBlur={() => handleBlur('languages')} />
                    {(!valid.languages && touched.languages) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
            </>}
          {userType === 'patient' &&
            <>
              <Row className='mt-4'>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Any known chronical desease?</Form.Label>
                    <Form.Control type="text" placeholder="Optional" onChange={(e) => setField('chronicalDeseases', e.target.value)} />
                  </Form.Group>
                </Col>
                <MobileDivider />
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Allergies (if known)</Form.Label>
                    <Form.Control type="text" placeholder="Optional" onChange={(e) => setField('allergies', e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Weight (if known)</Form.Label>
                    <Form.Control type="text" placeholder="Optional" onChange={(e) => setField('weight', e.target.value)} />
                  </Form.Group>
                </Col>
                <MobileDivider />
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Height (if known)</Form.Label>
                    <Form.Control type="text" placeholder="Optional" onChange={(e) => setField('height', e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
            </>}
          <Row className='mt-4'>
            <Col md={2}></Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Create Password *</Form.Label>
                <Form.Control type="password" placeholder="********" onChange={(e) => setField('password', e.target.value)} onBlur={() => handleBlur('password')} />
                {(!valid.password && touched.password) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
            <MobileDivider />
            <Col md={4}>
              <Form.Group>
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control type="password" placeholder="********" onChange={(e) => setField('passwordConfirmation', e.target.value)} onBlur={() => handleBlur('passwordConfirmation')} />
                {(!valid.passwordConfirmation && touched.passwordConfirmation) && <Form.Text className="text-danger">This field is required.</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={4}></Col>
            <Col md={4} style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button variant="primary" type="submit" disabled={!submitEnabled}>
                Create My Account
              </Button>
            </Col>
          </Row>
        </Form>
      </SignUpContainer>
    </Layout>
  )
}

export default SignUp;