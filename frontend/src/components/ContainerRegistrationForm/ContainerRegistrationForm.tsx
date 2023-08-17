import * as Yup from 'yup';
import { FC } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";

import {
  TextField
} from "@mui/material";

import { useRefMounted } from "@hooks";
import { useTranslation } from "react-i18next";


export const ContainerRegistryForm: FC = () => {

  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initValues = {
    chasis: '',
    color: ''
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        navigate('/dashboard')
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
        chasis: Yup.string()
          .max(255)
          .required(t('The chasis field ir required'))
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
            error={Boolean(touched.chasis && errors.chasis)}
            fullWidth
            required
            margin="normal"
            autoFocus
            helperText={touched.chasis && errors.chasis}
            label={t('Chasis')}
            name="chasis"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.chasis}
            variant="outlined"
          />
        </form>
      )}
    </Formik>
  )
}