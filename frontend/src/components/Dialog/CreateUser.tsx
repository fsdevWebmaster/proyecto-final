import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { TextField, Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import wait from '../../utils/wait';

interface ICreateUserProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  onSuccessHandler: () => void;
}

export const CreateUser = observer(({isOpen, onCloseHandler, onSuccessHandler}: ICreateUserProps) => {
  const { t } = useTranslation();

  // mock data
  const roles = [
    { label: t('Administrator'), value: 'admin' },
    { label: t('Subscriber'), value: 'subscriber' },
    { label: t('Customer'), value: 'customer' }
  ];

  return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={onCloseHandler}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h3" gutterBottom>
            {t('Add new user')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Fill in the fields below to create and add a new user to the site'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string()
              .max(255)
              .required(t('The first name field is required')),
            last_name: Yup.string()
              .max(255)
              .required(t('The last name field is required')),
            email: Yup.string()
              .email(t('The email provided should be a valid email address'))
              .max(255)
              .required(t('The email field is required')),
            password: Yup.string()
              .max(255)
              .required(t('The password field is required'))
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              onSuccessHandler();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              // setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={7}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            touched.first_name && errors.first_name
                          )}
                          fullWidth
                          helperText={touched.first_name && errors.first_name}
                          label={t('First name')}
                          name="first_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.first_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.last_name && errors.last_name)}
                          fullWidth
                          helperText={touched.last_name && errors.last_name}
                          label={t('Last name')}
                          name="last_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.last_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('Email')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          margin="normal"
                          helperText={touched.password && errors.password}
                          label={t('Password')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          value={values.password}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          // disablePortal
                          options={roles}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label={t('User role')}
                            />
                          )}
                        />                       
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={onCloseHandler}>
                  {t('Cancel')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Add new user')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
  );
});