import * as Yup from 'yup';
import { useState, type FC } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Button,
  CircularProgress,
  TextField
} from "@mui/material";

import { useRefMounted } from "@hooks/useRefMounted";
import { useTranslation } from "react-i18next";

export const ProfileForm: FC = () => {
  
  const isMountedRef = useRefMounted();
  const { t } : { t: any } = useTranslation();
  const navigate = useNavigate();
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ isButtonText, setButtonText ] = useState(t('Update'))

  const handleSaveButtonClick = () => {
    setIsDisabled(!isDisabled)
    setButtonText(isDisabled ? t('Save') : t('Update'))
  }

  const handleCancelButtonClick = () => {
    setIsDisabled(true)
    setButtonText(t('Update'))
  }

  const initValues = {
    name: '',
    email: '',
    password: '',
    identification: '',
    rol: '',
    submit: null
  };

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        // await login(values.email, values.password);
        // navigate('/dashboard')
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

  return(
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object().shape({
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
            disabled={isDisabled}
            margin="normal"
            autoFocus
            helperText={touched.name && errors.name}
            label={t('Name')}
            name='name'
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            disabled={isDisabled}
            margin='normal'
            helperText={touched.email && errors.email}
            label={t('Email')}
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.identification && touched.identification)}
            fullWidth
            disabled={isDisabled}
            margin='normal'
            helperText={touched.identification && touched.identification}
            label={t('Identification')}
            name='identificacition'
            onBlur={handleBlur}
            onChange={handleChange}
            type='identification'
            value={values.identification}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.rol && errors.rol)}
            fullWidth
            disabled={isDisabled}
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
          />

          <Button
            sx={{
              mt:2,
              ml:2
            }}
            style={{ backgroundColor: '#3E3E3E' }}
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            // type='submit'
            onClick={handleSaveButtonClick}
            size='large'
            variant='contained'
          >
            {/* {isDisabled ? 'Enable' : 'Disable'} */}
            {/* {t('Update')} */}
            { isButtonText }
          </Button>

          {!isDisabled && (
            <Button
              sx={{
                mt: 4,
                mb:2
              }}
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              onClick={handleCancelButtonClick}
              // type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              {t('Cancel')}
            </Button>
          )}
        </form>
      )}
    </Formik>
  )
}