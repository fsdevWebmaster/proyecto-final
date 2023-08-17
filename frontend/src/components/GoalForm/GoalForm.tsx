import { useRefMounted } from "@hooks";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const GoalForm: FC = () => {

  const isMountedRef = useRefMounted()
  const { t }: { t: any } = useTranslation()
  const navigate = useNavigate()

  const initSValues = {
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
    initialValues={initSValues}
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
            display='flex'
            flexDirection= 'column'
            m={1.5}
            p={2}
            sx={{
              minWidth: 0,
              minHeight: 0,
              backgroundColor: '#EBEBEB',
              borderRadius: 1
            }}
          >
            <Typography
              fontWeight={'fontWeightMedium'}
              variant="h4"
              m= {2}
            >
              {t('Container information')}
            </Typography>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={15}
            >
              <Box
                display={"flex"}
                alignContent= 'center'
                flexDirection= 'column'
              >
                <Typography>
                  {t('Date')}
                </Typography>
                <Typography>
                  {t('Container')}
                </Typography>
                <Typography>
                  {t('Driver')}
                </Typography>
                <Typography>
                  {t('Fuel Load')}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                alignContent={"center"}
                flexDirection={"column"}
              >
                <Typography
                >
                    {`15/05/2023 10:00`}
                </Typography>
                <Typography>
                  {`container`}
                </Typography>
                <Typography>
                  {`Nombre Conductor`}
                </Typography>
                <Typography>
                  {`fuelLoad`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  )
}
