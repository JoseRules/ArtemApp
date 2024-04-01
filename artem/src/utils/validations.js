const firstname = (firstname) => { return firstname !== "" }

const lastname = (lastname) => { return lastname !== "" }

const dateOfBirth = (dateOfBirth) => { return dateOfBirth !== "" }

const phoneNumber = (phoneNumber) => { return phoneNumber !== "" }

const email = (email) => { return email !== "" }

const password = (password) => { return password !== "" }

const passwordConfirmation = (passwordConfirmation) => { return passwordConfirmation !== "" }

const npi = (npi) => { return npi !== "" }

const experience = (experience) => { return experience !== "" }

const price = (price) => { return price !== "" }

const location = (location) => { return location !== "" }

const languages = (languages) => { return languages !== "" }

const chronicalDeseases = (chronicalDeseases) => { return chronicalDeseases !== "" }

const allergies = (allergies) => true;

const weight = (weight) => true;

const height = (height) => true;

const specialty = (specialty) => true;

const gender = gender => true;

const validations = {
    firstname, 
    lastname,
    dateOfBirth,
    phoneNumber,
    email,
    password,
    passwordConfirmation,
    npi,
    experience,
    price,
    location,
    languages,
    chronicalDeseases,
    allergies,
    weight,
    height,
    specialty,
    gender
}



export default validations;