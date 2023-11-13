import * as Yup from 'yup'
import type { FC } from 'react'
import { Formik } from "formik";

import {
  Button,
  CircularProgress,
  TextField,
  useTheme
} from "@mui/material";

import { useNavigate } from "react-router";
import { useRefMounted } from "@hooks/useRefMounted"
import { useTranslation } from "react-i18next";
import { IContainerFormProps } from '@common/interfaces';

export const DriverRegistrationForm: FC<IContainerFormProps> = ({modalAction}: IContainerFormProps) => {

  const isMountedRef = useRefMounted();
  const { t } : { t: any } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const initValues = {
      name: '',
      identification: ''
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      try {

        console.log("TODO: Post to /driver", values);

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
      modalAction();
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
            style={{ background: theme.colors.primary.dark }}
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
