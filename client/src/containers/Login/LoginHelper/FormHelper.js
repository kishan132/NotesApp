import * as Yup from 'yup';

const initialValues = {
  phone: ''
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Required')
    .matches(/^[6-9]\d{9}$/, 'Invalid Mobile Number')
});

export { initialValues, validationSchema };
