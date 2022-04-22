import * as yup from 'yup';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const registrationSchema = yup.object().shape({
  first_name: yup.string().required('First name required*'),
  last_name: yup.string().required('Last name required*'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter Phonenumber'),

  email: yup
    .string()
    .required('Email address required*')
    .email('Please enter vaild e-mail'),
  password1: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .required('Password required*')
    .min(8, 'Password must be at least 8 characters'),
  password2: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .oneOf([yup.ref('password1'), null], 'Passwords must match')
    .required('Confrim password required*')
    .min(8, 'Confrim password must be at least 8 characters'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});
