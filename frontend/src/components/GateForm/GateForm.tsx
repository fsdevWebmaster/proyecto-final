// import { useRefMounted } from "@hooks";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const GateForm: FC = () => {

  // const isMountedRef = useRefMounted()
  const navigate = useNavigate()

  const initSValues = {
    date: '',
    container: '',
    driver: '',
    fuelLoad: ''
  }


  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      // try {
      //   navigate('/dashboard')
      //   if (isMountedRef.current) {
      //     setStatus({ success: true })
      //     setSubmitting(false)
      //   }
      // } catch (error: any) {
      //   console.error(error)
      //   if (isMountedRef.current) {
      //     setStatus({ success: false })
      //     setErrors({ submit: error.message })
      //     setSubmitting(false)
      //   }
      // }
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
            mx={0}
            p={0}
            sx={{
              minWidth: 0,
              minHeight: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 1
            }}
          >
          </Box>
        </form>
      )}
    </Formik>
  )
}
