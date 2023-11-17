import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Avatar, Box, Button, Card, Grid, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, useTheme 
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { TableAction } from '@components/Tables/TableAction';
import Label from '@components/Label/Label';
import { User } from '@models/User/User';
import { Role } from '@models/Role/Role';
import { CustomDialog } from '@components/Dialog/CustomDialog';
import { ButtonConfig } from '@common/interfaces';
import { CreateUser } from '@components/Dialog/CreateUser';
import { useTranslation } from 'react-i18next';
import { userApi } from '@services/api/userApi';
import { roleApi } from '@services/api/roleApi';
import { useNavigate } from 'react-router';

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCUDialog, setCUDialog] = useState(false);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  const tableActions = [
    {
      title: t('Edit User'),
      clickHandler: () => {

        console.log("hola")

      },
      visible: true,
      icon: <EditTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    // {
    //   title: t('Delete User'),
    //   clickHandler: () => { setOpenDialog(true)},
    //   visible: true,
    //   icon: <DeleteTwoToneIcon fontSize="small" />,
    //   colors: {
    //     background: theme.colors.error.lighter,
    //     color: theme.palette.error.main,
    //   }      
    // }
];

const getUserRoleLabel = (userRoles: Role[]) => {

  const map: any = {
    'ADMINISTRATOR': {
      text: t('Administrator'),
      color: 'error'
    },
    'INSPECTOR': {
      text: t('Inspector'),
      color: 'info'
    },
    'ANALYST': {
      text: t('Analyst'),
      color: 'warning'
    },
    'DRIVER': {
      text: t('Driver'),
      color: 'success'
    },
    'GATE': {
      text: t('Gate'),
      color: 'black'
    },
  };

  const roleLabels: React.ReactNode[] = [];

  userRoles.map(uRole => {
    const uRoles = roles.filter(role => role.id === uRole.id)
    if (uRoles.length > 0) {
      uRoles.map((item:any) => {
        const { text, color }: any = map[item.name]
        roleLabels.push(<Label color={color} key={item.id}>{text}</Label>)
      })
    }
  })
  return roleLabels;
}

const onCreateUserHandler = async () => {
  alert('TO-DO call API')
};

const onCloseCUHandler = () => setCUDialog(false);

const dialogButtons: ButtonConfig[] = [
  {
    title: t('Cancel'),
    action: () => {
      setOpenDialog(false);
    },
    sx: {
      mx: 1
    }
  },
  {
    title: t('Disable User'),
    action: () => alert('To do'),
    sx: {
      mx: 1,
      px: 3,
      background: theme.colors.error.main,
      color: theme.palette.success.contrastText,
      '&:hover': {
         background: theme.colors.error.dark,
      }      
    }
  }
];

const handleData = async () => {
  // users
  const result = await userApi.getUsers()
  setUsers(result.data)
  // roles
  const roleResult = await roleApi.getRoles()
  setRoles(roleResult.data)
}

const handleCreate = () => {
  navigate('/create-user')
}

const handleBack = () => {
  navigate('/')
}

const handleSelected = (selectedUser: User) => {
  navigate(`/update-user/${selectedUser.id}`)
}


useEffect(() => {
  handleData()
}, [])


  return (
    <PageLayout
      seoTitle={t('Users List')}
      title={t('Users Management')}
      buttonConfig={{
        visible: true, 
        title: t('Create User'),
        color: 'primary',
        // action: () => setCUDialog(true)
        action: () => handleCreate()
      }}
      backButtonConfig={{
        visible : true,
        title: t('Go Back to main page'),
        color: 'secondary',
        action: () => handleBack()
      }}
      >
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('ID')}</TableCell>
                  <TableCell align="center">{t('Name')}</TableCell>
                  <TableCell align="center">{t('Email')}</TableCell>
                  <TableCell align="center">{t('Rol')}</TableCell>
                  {/* <TableCell align="center">{t('Date Created')}</TableCell> */}
                  <TableCell align="center">{t('Actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {

                  return (
                    <TableRow hover key={user.id}>
                      <TableCell>
                        <Typography variant="h5">
                          {user.idDoc}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              fontSize: `${theme.typography.pxToRem(14)}`,
                              background: `${theme.colors.warning.main}`,
                              color: `${theme.palette.getContrastText(
                                theme.colors.warning.dark
                              )}`,
                              width: 40,
                              height: 40,
                              mr: 1
                            }}
                          >
                            { user.name.substring(0, 1) }
                            { user.lastName.substring(0, 1) }
                          </Avatar>                          
                          <Box>
                            <Typography noWrap variant="subtitle2">
                              {user.name } { user.lastName }
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{user.email}</Typography>
                      </TableCell>
                      <TableCell>{getUserRoleLabel(user.roles)}</TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                          {
                            tableActions.map(action => (
                              <div key={user.id}
                                onClick={ () => handleSelected(user) }>
                                <EditTwoToneIcon fontSize="small" />
                              </div>
                            ))
                          }
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>          
        </Card>
      </Grid>
      <CustomDialog isOpen={openDialog} type="error" header="Disable User" configBtn={dialogButtons} onCloseHandler={() => setOpenDialog(false)}/>
      <CreateUser isOpen={openCUDialog} onCloseHandler={onCloseCUHandler} onSuccessHandler={onCreateUserHandler}/>
    </PageLayout>
  );
};

export default observer(Users);
