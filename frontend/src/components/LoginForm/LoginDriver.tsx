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
// import { JWTHelper } from '@helpers/jwtHelper';
import { observer } from 'mobx-react';
import { MxDriverStore } from '@stores';
import { Driver } from '@models';
import { JWTHelper } from '@helpers/jwtHelper';

export const LoginDriver: FC = observer(() => {

  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initValues = {
    idDoc: '',
    submit: null
  };

  const login = async (idDoc: string, callback?: Function) => {

    try {
      const response = await MxDriverStore.loginDriver(idDoc);
      const {token} = response.data;

      if(token) {
        const decodedToken = JWTHelper.decodeToken(token);

        if (decodedToken.driver) {
          MxDriverStore.setDriverAuth(true);
          MxDriverStore.setDriver(decodedToken.driver as Driver);
          MxDriverStore.setSession(token);
          callback!();
        } else {
          MxDriverStore.setDriverAuth(false);
          MxDriverStore.setDriver(null);
        }
      } else {
        MxDriverStore.setDriverAuth(false);
        MxDriverStore.setDriver(null);
        MxDriverStore.setSession(null);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {

      try {
        await login(values.idDoc, () => {
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
          navigate('/driver-dashboard');
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
      name="login-driver"
      initialValues={initValues}
      validationSchema={Yup.object().shape({
        idDoc: Yup.string()
          .max(14)
          .required(t('Your document ID is required')),
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
            error={Boolean(touched.idDoc && errors.idDoc)}
            fullWidth
            required
            margin="normal"
            autoFocus
            helperText={touched.idDoc && errors.idDoc}
            label={t('ID')}
            name="idDoc"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.idDoc}
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
