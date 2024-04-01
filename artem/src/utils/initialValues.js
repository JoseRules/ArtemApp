export const initialTouchedValues = {
  firstname: false, 
  lastname: false, 
  dateOfBirth: false, 
  phoneNumber: false, 
  password: false, 
  passwordConfirmation: false,
  npi: false, 
  experience: false, 
  price: false, 
  location: false, 
  languages: false,
  chronicalDeseases: false,
  allergies: false,
  weight: false,
  height: false
};

export const initialInputValues = {
  firstname: "", 
  lastname: "", 
  phoneNumber: "", 
  password: "", 
  passwordConfirmation: "",
  npi: "", 
  experience: "", 
  price: "", 
  location: "", 
  languages: "",
  gender: 'Male', 
  specialty: 'Acupuncturist',
  chronicalDeseases: "",
  allergies: "",
  weight: "",
  height: ""
};

export const initialLoginInfo = {
  email: "",
  password: ""
};

export const initialLoginTouch = {
  email: false,
  password: false
}

export const initialModalInfo = {
  open: false,
  title: '',
  text: '',
  buttonlink: '', 
  buttonText: ''
}

export const initialUserState = {
  userInfo: {
    type: '',
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    profilePicUrl: '',
    dateOfBirth: '',
    gender: '',
    chronicalDeseases: '',
    allergies: '',
    weight: '',
    height: '',
    specialty: '',
    npi: '',
    location: '',
    experience: '',
    languages: '',
    price: '',
    id: 0
  },
  modalInfo: initialModalInfo
};

export const doctorSchedule = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];

export const apptsArray = [
  {
    apptId: 0,
    date: "",
    doctorId: 0,
    isConfirmed: false,
    patientId: 0
  }
];

export const availApptsArray = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];
