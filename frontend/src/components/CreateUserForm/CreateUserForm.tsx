import * as Yup from 'yup';
import { useState, type FC, useEffect } from 'react';
import { Formik } from 'formik';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  Typography,
  Alert,
  Box
} from '@mui/material';

import {useRefMounted} from '@hooks/useRefMounted';
import { useTranslation } from 'react-i18next';
import { Role } from '@models/Role/Role';
import { roleApi } from '@services/api/roleApi';
import { userApi } from '@services/api/userApi';
import { User } from '@models/User/User';
import { RolesSelector } from './RolesSelector';
import { ArrowBack } from '@mui/icons-material';

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
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  
  // TO-DO
  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      const regData = { ...values }
      let rolesIds:string[] = selectedRoles.map(role => {
        return role.id
      })
      if (rolesIds.length === 0) {
        setErrorMsg(t("Please select a role."))
        return
      }
      regData.roles = rolesIds
      if (!updatingUser) {
        try {
          const resp = await userApi.registerUser(regData)
          if (resp.data) {
            navigate('/users')
            setStatus({ success: true });
          }
        } catch (err: any) {
          setErrorMsg(err)
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }
      else {
        const resp = await userApi.updateUser(regData)
        if (resp.data) {
          navigate('/users')
        }
      }
    }

  const handleRoles = async () => {
    const resp = await roleApi.getRoles()
    setRoles(resp.data)
  }

  const handleSelectedRoles = (roles: Role[]) => {
    setSelectedRoles(roles)
  }

  const handleUser = async (userId: string) => {
    const resp = await userApi.getProfile(userId)
    setUpdatingUser(resp.data)
  }

  const handleCancel = () => {
    navigate('/')
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
    <>
      { updatingUser ?
        <Box>
          <Typography
            variant="h2"
            sx={{
              mb: 1
            }}
            color='secondary'
          >
            {t('Update user')}
          </Typography>
        </Box>    
        :
        <Box>
          <Typography
            variant="h2"
            sx={{
              mb: 1
            }}
            color='secondary'
          >
            {t('Create user')}
          </Typography>
        </Box>        
      }
      { errorMsg &&
        <Alert severity='error' sx={{ marginBottom: '5px' }}>
          {t(`${errorMsg}`)}
        </Alert>
      }
      <Button
        variant='contained'
        color='secondary'
        startIcon={<ArrowBack />}
        size='small'
        onClick={handleCancel}
        sx={{ marginBottom: '15px' }}
      >
        {t('Cancel')}
      </Button>
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
            .max(255),
            //.required(t('The password field is required')),
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
                margin='dense'
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
                margin='dense'
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
                margin='dense'
                helperText={touched.email && errors.email}
                label={t('Email address')}
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
                variant='outlined'
              />
              { !updatingUser && 
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  required
                  margin='dense'
                  helperText={touched.password && errors.password}
                  label={t('Password')}
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='password'
                  value={values.password}
                  variant='outlined'
                />
              }
              <TextField
                error={Boolean(touched.idDoc && errors.idDoc)}
                fullWidth
                required
                margin='dense'
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
                <>
                  <RolesSelector 
                    roles={ roles } 
                    sendSelected={ (selected) => handleSelectedRoles(selected) } 
                    updatingUser={ updatingUser }
                  />
                </>
              }

              <Button
                sx={{
                  mt:2
                }}
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                type='submit'
                size='medium'
                variant='contained'
              >
                {t('Save')}
              </Button>
            </form>
          )}
      </Formik>
    </>
  )
}