import * as Yup from 'yup'
import type { FC } from 'react'
import { Formik, FormikHelpers } from "formik";
import React, { forwardRef, useImperativeHandle } from 'react';
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
import { Driver } from '@models/Driver/Driver';
import { driverApi } from "@services/api/driverApi";

export type DriverRegistrationFormRef = {
  resetForm: () => void;
};

export const DriverRegistrationForm = forwardRef<DriverRegistrationFormRef, IContainerFormProps>(
  ({ modalAction }, ref) => {
    const isMountedRef = useRefMounted();
    const { t } : { t: any } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();


      const handleBack = () => {
      navigate('/')
      }

      const handleSubmit = async (values: Driver, formikBag: FormikHelpers<Driver>) => {
        try {
        const response = await driverApi.newDriver(values)

        if (response.data && response.status === 200) {
          formikBag.setStatus({ success: true });
          formikBag.setSubmitting(false);
          modalAction('success', 'Conductor registrado con éxito');
        }else{
          throw new Error(response.data.error || 'Error al registrar el conductor');
        }
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          formikBag.setStatus({ success: false, errorMessage: error.message });
          formikBag.setSubmitting(false);
          modalAction('error', 'Error al registrar el conductor');
        }
        }
      }

      const initValues: Driver = {
        id: '',
        name: '',
        idDoc: '',
        email: '',
      }

    return (
      <Formik
        initialValues={initValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required(t('The name field is required')),
          idDoc: Yup.string().max(255).required(t('The identification field is required')),
          email: Yup.string().max(255).required(t('The email field is required'))
        })}
        onSubmit={handleSubmit}
      >
         {(formikProps) => {
          const {
            errors,
            handleBlur,
            handleChange,
            handleSubmit, 
            isSubmitting,
            touched,
            values,
            resetForm
          } = formikProps;
          useImperativeHandle(ref, () => ({
            resetForm
          }));

          return (
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
                  error={Boolean(touched.idDoc && errors.idDoc)}
                  fullWidth
                  required
                  helperText={touched.idDoc && errors.idDoc}
                  label={t('Identification')}
                  name='idDoc'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='text'
                  value={values.idDoc}
                  variant='outlined'
                  />
                  <TextField
                  style={{marginTop: '10px'}}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  required
                  helperText={touched.email && errors.email}
                  label={t('Email')}
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='text'
                  value={values.email}
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
                  <Button
                  sx={{
                  mt: 4,
                  mb: 2
                  }}
                  style={{ background: theme.colors.secondary.dark, marginLeft: 12 }}
                  startIcon={isSubmitting ? <CircularProgress size="1-rem"/> : null}
                  disabled={isSubmitting}
                  type='submit'
                  size='large'
                  variant='contained'
                  onClick={handleBack}
                  >
                  {t('Go back to main page')}
                  </Button>
            </form>
          );
        }}
      </Formik>
    );
  }
);