import { type FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  TextField,
  CircularProgress
} from '@mui/material';
import {useRefMounted} from '@hooks/useRefMounted'
import { useTranslation } from 'react-i18next';
import { MxLoginStore, MxUserStore } from '@stores';
import { JWTHelper } from '@helpers/jwtHelper';
import { observer } from 'mobx-react';

export const LoginForm: FC = observer(() => {

  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initValues = {
    email: '',
    password: '',
    submit: null
  };

  const initProfile = async (token: string) => {
    const info = JWTHelper.decodeToken(token);

    if (info!.id) {
      await MxUserStore.initProfile(info.id);
    }
  }

  const login = async (email: string, pass: string, callback?: Function) => {

    try {
      const response = await MxLoginStore.loginUser(email, pass);
      const { logged, user } = response.data;

      if (logged && user) {
        MxLoginStore.setSession(user, logged);
        await initProfile(user);
        callback!();        
      } else {
        MxLoginStore.resetAuth();
        MxLoginStore.setSession(null, false);        
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {

      try {
        await login(values.email, values.password, () => {
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
          navigate('/');
        });

      } catch (err: any) {
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
        email: Yup.string()
          .email(t('The email provided should be a valid email address'))
          .max(255)
          .required(t('The email field is required')),
        password: Yup.string()
          .max(255)
          .required(t('The password field is required'))
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
            error={Boolean(touched.email && errors.email)}
            fullWidth
            required
            margin="normal"
            autoFocus
            helperText={touched.email && errors.email}
            label={t('Email')}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            required
            margin="normal"
            helperText={touched.password && errors.password}
            label={t('Password')}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
            <Button
              sx={{
                mt: 1.5
              }}
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              type="submit"
              size="medium"
              variant="contained"
            >
              {t('Sign in')}
            </Button>
        </form>
      )}
    </Formik>
  );
});
