import * as Yup from 'yup'
import type { FC } from 'react'
import { Formik } from "formik";

import {
  Button,
  CircularProgress,
  TextField
} from "@mui/material";

import { useNavigate } from "react-router";
import { useRefMounted } from "@hooks"
import { useTranslation } from "react-i18next";

export const DriverRegistrationForm: FC = () => {

  const isMountedRef = useRefMounted();
  const { t } : { t: any } = useTranslation();
  const navigate = useNavigate();
  
  const initValues = {
      name: '',
      identification: ''
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        if (isMountedRef.current) {
          setStatus({ succes: true })
          setSubmitting(false)
        }
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setStatus({ success: false })
          setErrors({ submit: error.message })
          setSubmitting(false)
        }
      }
  }

  return(
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255)
          .required(t('The name field is required')),
        identification: Yup.string()
          .max(255)
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
          error={Boolean(touched.identification && errors.identification)}
          fullWidth
          required
          helperText={touched.identification && errors.identification}
          label={t('Identification')}
          name='identification'
          onBlur={handleBlur}
          onChange={handleChange}
          type='text'
          value={values.identification}
          variant='outlined'
          />

          <Button
            sx={{
              mt: 4,
              mb: 2
            }}
            style={{ background: '#3E3E3E' }}
            startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
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
