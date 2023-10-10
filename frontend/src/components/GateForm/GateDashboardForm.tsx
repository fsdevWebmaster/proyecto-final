import * as Yup from 'yup'
import type { FC } from 'react'
import { Formik } from 'formik'
import { useNavigate } from "react-router"
import {
  Box,
  Link,
  Button,
  Typography,
  styled,
  InputBase,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  CircularProgress,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Paper
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
// import { useRefMounted } from "@hooks"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from 'react-router-dom'

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const GateDashboardForm: FC =() => {

  // const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    container: '',
  }

  const handleSubmit = async (values: any,
    { setErrors, setStatus, setSubmitting }: any): Promise<void> => {
      // try {
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
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        container: Yup.string()
          .max(255)
          .required('The container field is required')
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
        <Box>
          <Typography
            variant='h3'
            sx={{
              m: 1,
              mt: 3,
              fontSize: 20
            }}
          >
            {t('Dashboard')}
          </Typography>

          <Box
            display={{ xs: 'block', md: 'flex'}}
            alignItems= {'center'}
            justifyContent= {'center'}
            sx={{
              minWidth: 0,
              minHeight: 0,
              flexShrink: 0,
              backgroundColor: '#EBEBEB',
              borderRadius: 1
            }}
          >
            <Box
              sx={{
                width: 370,
                height: 100,
                fontSize: 18,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Link component={RouterLink} to='/'>
                {t('Incomes')}
              </Link>
              <Link component={RouterLink} to='/dashboard/container-registration'>
                {t('Container Registration')}
              </Link>
              <Link component={RouterLink} to='/dashboard/driver-registration'>
                {t('Driver Registration')}
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography
              variant='h3'
              sx={{
                m: 1,
                mt: 3,
                fontSize: 20
              }}
            >
              {t('Container')}
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder= {t("Search…")}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <TableContainer component={Paper} sx={{ maxHeight: 150 }}>
              <Table sx={{ minWidth: 300, minHeight: 10, overflow: 'auto' }} aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Typography
              variant='h3'
              sx={{
                m: 1,
                mt: 3,
                fontSize: 20
              }}
            >
              {t('Driver')}
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder= {t("Search…")}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          <Box>
            <Typography
              variant='h3'
              sx={{
                m: 1,
                mt: 3,
                fontSize: 20
              }}
            >
              {t('Fuel Load')}
            </Typography>

            <Box
              display={'flex' }
              alignItems= {'center'}
              justifyContent= {'space-evenly'}
            >
              <FormControl>
                <RadioGroup
                  row
                  name='fuel'
                  defaultValue='yes'
                  // value={values.fuel}
                  onChange={handleChange}
                  sx={{
                    gap: '80px'
                  }}
                >
                  <FormControlLabel value='yes' control={<Radio />} label={t('Yes')} />
                  <FormControlLabel value='no' control={<Radio />} label={t('No')} />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Button
              sx={{
                mt: 4,
                mb: 2
                // backgroundColor: '#3E3E3E'
              }}
              style={{ backgroundColor: '#3E3E3E' }}
              startIcon={isSubmitting ? <CircularProgress size='1rem' />: null}
              disabled={isSubmitting}
              fullWidth
              type="submit"
              size='large'
              variant='contained'
            >
              {t('Done')}
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  )
}