import * as Yup from 'yup';
import { useState, type FC, useEffect } from 'react';
import { Formik } from 'formik';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  CircularProgress,
  MenuItem
} from '@mui/material';

import {useRefMounted} from '@hooks';
import { useTranslation } from 'react-i18next';
import { Role } from '@models/Role/Role';
import { roleApi } from '@services/api/roleApi';
import { userApi } from '@services/api/userApi';
import { User } from '@models/User/User';

export const CreateUserForm: FC = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [updatingUser, setUpdatingUser] = useState<User | null>(null)
  const [formState, setFormState] = useState<User>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    idDoc: '',
    roles: []
  })
  
  // TO-DO
  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        const resp = await userApi.registerUser(values)
        if (resp.data) {
          navigate('/users')
          setStatus({ success: true });
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

  const handleRoles = async () => {
    const resp = await roleApi.getRoles()
    setRoles(resp.data)
  }

  const handleUser = async (userId: string) => {
    const resp = await userApi.getProfile(userId)
    setUpdatingUser(resp.data)
  }
  
  useEffect(() => {
    handleRoles()
    if (location.pathname.includes('/update-user/')) {
      const userId = location.pathname.split('/')[2]
      if (userId) {
        handleUser(userId)
      }
    }
  }, [])

  useEffect(() => {
    if (updatingUser) {
      setUpdatingUser(updatingUser)
      setFormState(updatingUser)
    }
  }, [updatingUser])
  
  
  return (
    <Formik
      initialValues={formState}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255)
          .required(t('The name field is required')),
        lastName: Yup.string()
          .max(255)
          .required(t('The last name field is required')),
        email: Yup.string()
          .email(t('The email provided should be a valid email address'))
          .max(255)
          .required(t('The email field is required')),
        password: Yup.string()
          .max(255)
          .required(t('The password field is required')),
        idDoc: Yup.number()
          .min(255)
          .required(t('The id document field is required'))
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
              error={Boolean(touched.name && errors.name)}
              fullWidth
              required
              margin='normal'
              autoFocus
              helperText={touched.lastName && errors.lastName}
              label={t('Last name')}
              name='lastName'
              onBlur={handleBlur}
              onChange={handleChange}
              type='text'
              value={values.lastName}
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
              error={Boolean(touched.idDoc && errors.idDoc)}
              fullWidth
              required
              margin='normal'
              helperText={touched.idDoc && errors.idDoc}
              label={t('Identification')}
              name='idDoc'
              onBlur={handleBlur}
              onChange={handleChange}
              type='number'
              value={values.idDoc}
              variant='outlined'
            />
            { roles.length > 0 &&
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
                {roles.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            }

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