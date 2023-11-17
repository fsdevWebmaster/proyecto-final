import { FC } from "react";
import { Formik } from "formik";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Typography
} from "@mui/material";
import { useRefMounted } from "@hooks/useRefMounted";
import { useTranslation } from "react-i18next";

export const journeyStatusForm: FC = () => {

  const isMountedRef = useRefMounted()
  const { t }: { t: any } = useTranslation()
  const navigate = useNavigate()

  const initValues = {
    date: '',
    container: '',
    driver: '',
    fuelLoad: ''
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
        console.error(error)
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
          <Box
            sx={{
              display: "flex",
              alignItems:"center",
              flexDirection: "column",
              justifyContent:"center",
              m:'1.5em'
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:"center",
                alignContent: 'center',
                justifyContent:"center",
                borderRadius:'5px',
                background:'#EBEBEB',
                minWidth:'18em',
                minHeight:'4em'
              }}
            >
              <Typography
                fontWeight={'fontWeightMedium'}
                variant="h4"
              >
                {t('Route Information')}
              </Typography>
            </Box>
              {/* Falta implementar split button */}
            <Typography
              fontWeight={'fontWeightMedium'}
              variant="h5"
            >
              {t('Date')}
            </Typography>
          </Box>

          <Button
            sx={{
              mt: 4,
              mb:2
            }}
            component={RouterLink} to="/"
            style={{ backgroundColor: '#3E3E3E' }}
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
          >
            {t('Move Container')}
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems:"center",
              justifyContent:"space-between",
              m:'2em',
            }}
          >
            <Button
              component={RouterLink} to="/"
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              size="large"
              variant="contained"
            >
              {t('Send')}
            </Button>

            <Button
              component={RouterLink} to="/"
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              size="large"
              variant="contained"
            >
              {t('Back')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}
