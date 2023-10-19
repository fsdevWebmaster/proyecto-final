import * as Yup from 'yup';
import { FC } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";

import {
  Button,
  TextField
} from "@mui/material";

import { useRefMounted } from "@hooks";
import { useTranslation } from "react-i18next";

export const ContainerRegistryForm: FC = () => {

  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initValues = {
    containerNumber: ''
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        console.log(values)
        // navigate('/dashboard')
        if (isMountedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
        }
      } catch (error: any) {
        console.log(error);
        if (isMountedRef.current) {
            setStatus({ success: false })
            setErrors({ submit: error.message })
            setSubmitting(false)
        }
      }
    }

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object().shape({
        containerNumber: Yup.string()
          .max(255)
          .required(t('Container number is required'))
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
            error={Boolean(touched.containerNumber && errors.containerNumber)}
            fullWidth
            required
            margin="normal"
            autoFocus
            helperText={touched.containerNumber && errors.containerNumber}
            label={t('Container number')}
            name="containerNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.containerNumber}
            variant="outlined"
          />
        <Button type='submit'>{t('Save')}</Button>
        </form>
      )}
    </Formik>
  )
}