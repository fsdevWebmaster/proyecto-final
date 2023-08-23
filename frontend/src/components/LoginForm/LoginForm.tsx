import * as Yup from 'yup';
import { useEffect, type FC } from 'react';
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Button,
  TextField,
  CircularProgress
} from '@mui/material';
import {useRefMounted} from '@hooks';
import { useTranslation } from 'react-i18next';
import { MxLoginStore } from '@stores/LoginStore';
import { JWTHelper } from '@helpers/jwtHelper';
import { MxUserStore } from '@stores/UserStore';
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

  const login = async (user: string, pass: string, callback?: Function) => {
    const response = await MxLoginStore.loginUser(user, pass);

    if (response.data) {
      const { token } = response.data;

      if (token) {
        MxLoginStore.setSession(token);
        await initProfile(token);
        callback!();
      }
    } else {
      MxLoginStore.resetAuth();
      MxLoginStore.setSession(null);
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
          navigate('/dashboard');
        });

      } catch (err: any) {
        if (isMountedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
  }

  useEffect(() => {

    const checkLogin = async() => {
      const localToken = MxLoginStore.getAccessToken();
      if (localToken) {
        MxLoginStore.setSession(localToken);
        await initProfile(localToken);

        const user = MxUserStore.userInfo;
        
        if (user) {
          navigate('/dashboard');
        }
      }
    }

     checkLogin();
  },[]);

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
            label={t('Email address')}
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

            <Button
              sx={{
                mt: 4,
                mb:2
              }}
              component={RouterLink} to="/recover-password"
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              {t('Reset password')}
            </Button>
        </form>
      )}
    </Formik>
  );
});
