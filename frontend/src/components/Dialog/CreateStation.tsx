import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { TextField,
          Button,
          CircularProgress,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          Grid,
          Typography,
          Checkbox,
          FormControlLabel,
          Box
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import wait from '../../utils/wait';

interface ICreateStationProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  onSuccessHandler: () => void;
}

export const CreateStation = observer(({isOpen, onCloseHandler, onSuccessHandler}: ICreateStationProps) => {
  const { t } = useTranslation();

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
            {t('Add new Station')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Fill in the fields below to create and add a new station to the site'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            name: '',
            status: true,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(255)
              .required(t('The name field is required')),
            status: Yup.boolean()
              // .oneOf(
              //   [true],
              //   t('text')
              // )
          })}
          onSubmit={async (
            _values,
            { resetForm, setStatus, setSubmitting }
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
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Name')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                          {t('Status')}
                        </Typography>
                        <Box display={{ xs: 'block', md: 'flex' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.status}
                                name="status"
                                color="primary"
                                onChange={handleChange}
                              />
                            }
                            label={
                              <>
                                <Typography variant="inherit">
                                  {t('Select to enable/disable')}.
                                </Typography>
                              </>
                            }
                          />
                        </Box>
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
                  {t('Add new station')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
  );
});