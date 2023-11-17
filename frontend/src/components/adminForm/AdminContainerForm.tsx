import { FC } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  styled,
  InputBase
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useRefMounted } from "@hooks/useRefMounted";
import { useTranslation } from "react-i18next";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#EBEBEB',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

export const AdminDashboardForm: FC = () => {

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
            marginTop={'2em'}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={t("Search…")}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 15,
              alignItems:"center",
              flexDirection: "row",
              justifyContent:"center",
              borderBottom: "solid 1px grey"
            }}
          >
            <Typography
              fontWeight={'fontWeightMedium'}
              variant="h5"
              mt={'1.5em'}
              mb={'0.8em'}
            >
              {t('#ID')}
            </Typography>

            <Typography
              fontWeight={'fontWeightMedium'}
              variant="h5"
              mt={'1.5em'}
              mb={'0.8em'}
            >
              {t('Date')}
            </Typography>

            <Typography
              fontWeight={'fontWeightMedium'}
              variant="h5"
              mt={'1.5em'}
              mb={'0.8em'}
            >
              {t('State')}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}
