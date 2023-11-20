import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { Table, Card, Typography,Grid,TableCell,useTheme, TableRow, TableContainer, TableHead , TableBody, Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { containerApi } from '@services/api/containerApi';
import { ContainerModel } from '@models';
import { Add, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';


const Containers = () => {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate()
  const theme = useTheme();
  const [containers, setContainers] = useState<ContainerModel[]>([])

  const handleContainers = async () => {
    const resp = await containerApi.getContainers()
    let containers = resp.data.map((container:ContainerModel) => {
      const date = new Date(container.createdAt)
      container.createdAt = date
      return container
    })
    setContainers(resp.data)
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleCreate = () => {
    navigate('/container-registry')
  }

  useEffect(() => {
    handleContainers()
  }, [])
  

  return (
    <>
    <PageLayout seoTitle='Container List' title='Containers' 
        buttonConfig={{
          visible: true, 
          title: t('Create container'), 
          color: 'primary',
          action: () => handleCreate()}
      }
      >
      <Grid item>
      </Grid>
      <Grid item lg={16} md={6} xs={12}>
        {/* <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          sx={{ marginBottom: '15px' }}
          onClick={handleCreate}
        >
          {t('Create container')}
        </Button> */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Container Number</TableCell>
                  <TableCell align="center">Creation date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {containers.map((container) => {
                  return (
                    <TableRow key={container.id}>
                      <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                          {t(container.containerNumber)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='h5' noWrap>
                          {container.createdAt.toDateString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Button
          variant='contained'
          startIcon={<ArrowBack />}
          sx={{ marginTop: '15px' }}
          onClick={handleBack}
          color='secondary'
        >
          {t('back')}
        </Button>
      </Grid>
    </PageLayout>
    </>
  );
}

export default observer(Containers);