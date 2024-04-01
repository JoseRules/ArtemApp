import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../../assets/images/Artem.png';
import { LoginContainer, ArtemLogo, PageContainer } from './Login.styled';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { initialLoginInfo, initialLoginTouch, initialModalInfo } from '../../utils/initialValues';
import validations from '../../utils/validations';
import { loginUser } from '../../services/userServices';
import Modal from '../../components/Modal/Modal';
import { useUpdateUser, useUser } from '../../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { saveSessionStorage } from '../../utils/getSessionStorage';
import Layout from '../../components/Layout/Layout';

const Login = () => {
  const [form, setForm] = useState(initialLoginInfo);
  const [touched, setTouched] = useState(initialLoginTouch);
  const [valid, setValid] = useState({ email: false, password: false });
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [modal, setModal] = useState(initialModalInfo);
  const userInfo = useUser();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    setValid({ ...valid, [field]: validations[field](value) })
    !touched[field] && setTouched({ ...touched, [field]: true })
  }

  const handleBlur = field => {
    !touched[field] && setTouched({
      ...touched,
      [field]: true
    })
  }

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

  const evaluateForm = () => {
    setSubmitEnabled(valid.email && valid.password);
  }

  const sendLogin = (e) => {
    e.preventDefault();
    loginUser({ email: form.email, password: form.password })
      .then(res => {
        const state = { ...userInfo, userInfo: { ...res.data, type: res.data.specialty ? 'doctor' : 'patient' } };
        updateUser(state);
        saveSessionStorage(state);
        return navigate('/profile');
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) throwModal('userNotFound');

      });
  }

  useEffect(() => {
    evaluateForm();
  }, [form]);

  return (
    <Layout>
      <PageContainer>
        <Modal showModal={modal.open} title={modal.title} text={modal.text} closeModal={handleCloseModal} buttonText={modal.buttonText} buttonlink={modal.buttonlink} />
        <LoginContainer>
          <Form onSubmit={sendLogin}>
            <ArtemLogo src={logo} width={40} />
            <Row className='mt-4'>
              <Col>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="text" placeholder="Email" name="email" id='email' onChange={(e) => { setField('email', e.target.value) }} onBlur={() => { handleBlur('email') }} />
                  {(touched.email && !valid.email) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col>
                <Form.Group>
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" placeholder="**********" onChange={(e) => { setField('password', e.target.value) }} onBlur={() => { handleBlur('password') }} />
                  {(touched.password && !valid.password) && <Form.Text className="text-danger">This field is required.</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col md={4}></Col>
              <Col md={12} style={{ justifyContent: 'center', textAlign: 'center' }}>
                <Button variant="primary" type="submit" disabled={!submitEnabled}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </LoginContainer>
      </PageContainer>
    </Layout>
  );
}

export default Login;