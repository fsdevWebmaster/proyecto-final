import * as Yup from 'yup';
import type { FC } from 'react';
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  CircularProgress,
  MenuItem
} from '@mui/material';

import {useRefMounted} from '@hooks';
import { useTranslation } from 'react-i18next';

export const CreateUserForm: FC = () => {
  
  // TO-DO
  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initValues = {
    name: '',
    email: '',
    password: '',
    identification: '',
    rol: '',
    submit: null
  };

  const rolValues = [
    {
      value: 'manager',
      label: 'Manager'
    },
    {
      value: 'checker',
      label: 'Checher'
    },
    {
      value: 'driver',
      label: 'Driver'
    },
    {
      value: 'porter',
      label: 'Porter'
    }
  ]
  
  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        navigate('/dashboard')
        if (isMountedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err: any) {
        console.error(err);
        if (isMountedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    }
  
  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255)
          .required(t('The name field is required')),
        email: Yup.string()
          .email(t('The email provided should be a valid email address'))
          .max(255)
          .required(t('The email field is required')),
        password: Yup.string()
          .max(255)
          .required(t('The password field is required')),
        identification: Yup.number()
          .min(255)
          .required(t('The identification field is required'))
      })}
      onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }): JSX.Element => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              required
              margin='normal'
              autoFocus
              helperText={touched.name && errors.name}
              label={t('Name')}
              name='name'
              onBlur={handleBlur}
              onChange={handleChange}
              type='text'
              value={values.name}
              variant='outlined'
            />
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              required
              margin='normal'
              helperText={touched.email && errors.email}
              label={t('Email address')}
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              value={values.email}
              variant='outlined'
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              required
              margin='normal'
              helperText={touched.password && errors.password}
              label={t('Password')}
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.password}
              variant='outlined'
            />
            <TextField
              error={Boolean(touched.identification && errors.identification)}
              fullWidth
              required
              margin='normal'
              helperText={touched.identification && errors.identification}
              label={t('Identification')}
              name='identification'
              onBlur={handleBlur}
              onChange={handleChange}
              type='number'
              value={values.identification}
              variant='outlined'
            />
            <TextField
              error={Boolean(touched.rol && errors.rol)}
              fullWidth
              select
              margin='normal'
              helperText={touched.rol && errors.rol}
              label={t('Rol')}
              name='rol'
              onBlur={handleBlur}
              onChange={handleChange}
              type='text'
              value={values.rol}
              variant='outlined'
            >
              {rolValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              sx={{
                mt:2,
                ml:2,
                backgroundColor: '#3E3E3E'
              }}
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              type='submit'
              size='large'
              variant='contained'
            >
              {t('Save')}
            </Button>
          </form>
        )}
    </Formik>
  )
}