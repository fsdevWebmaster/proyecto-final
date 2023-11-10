import * as Yup from 'yup';
import { ChangeEvent, FC, useEffect, useState, MouseEvent } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";

import {
  Alert,
  Button,
  TextField
} from "@mui/material";

import { useRefMounted } from "@hooks/useRefMounted";
import { useTranslation } from "react-i18next";
import { containerApi } from '@services/api/containerApi';
import { IContainerFormProps } from '@common/interfaces';

export const ContainerRegistryForm: FC<IContainerFormProps> = ({modalAction}: IContainerFormProps) => {
  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const initValues = {
    containerNumber: ''
  } 

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {
        await containerApi.createContainer(values)
        navigate('/containers')
        if (isMountedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
        }
      } catch (error: any) {
        if (isMountedRef.current) {
            setErrorMsg('Container creation failed.')
            setStatus({ success: false })
            setErrors({ submit: error.message })
            setSubmitting(false)
        }
      }
      modalAction();
    }
  

  return (
    <>
     { errorMsg &&
        <Alert severity="error">
          {t(`${errorMsg}`)}
        </Alert>
      }
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
    </>
  )
}