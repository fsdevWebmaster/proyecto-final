import React, { useState } from 'react';
import { format } from 'date-fns';
import { Avatar, Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
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

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCUDialog, setCUDialog] = useState(false);
  const theme = useTheme();

  const users: User[] = [
    {
      id: '11',
      name: 'Jose',
      lastName: 'Zuniga',
      email: 'josemzr@hotmail.com',
      personalId: '401900767',
      roles: [{
        id: '123456',
        code: 1,
        role: 'ADMIN',
      }]
    },
    {
      id: '12',
      name: 'Francisco',
      lastName: 'Jimenez',
      email: 'fr@hotmail.com',
      personalId: '401900111',
      roles: [{
        id: '654321',
        code: 4,
        role: 'INSPECTOR',
      }]
    },
    {
      id: '13',
      name: 'Fidel',
      lastName: 'Silva',
      email: 'fidel@hotmail.com',
      personalId: '101900111',
      roles: [{
        id: '33126',
        code: 5,
        role: 'ANALYST',
      }]
    },
    {
      id: '14',
      name: 'David',
      lastName: 'Calderon',
      email: 'dcal@hotmail.com',
      personalId: '101900122',
      roles: [{
        id: '33127',
        code: 5,
        role: 'DRIVER',
      }]
    }     
  ];

  const tableActions = [
    {
      title: 'Edit User',
      clickHandler: () => {},
      visible: true,
      icon: <EditTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    {
      title: 'Delete User',
      clickHandler: () => { setOpenDialog(true)},
      visible: true,
      icon: <DeleteTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.error.lighter,
        color: theme.palette.error.main,
      }      
    }
];

const getUserRoleLabel = (roles: Role[]) => {
  const map = {
    'ADMIN': {
      text: 'Administrator',
      color: 'error'
    },
    'INSPECTOR': {
      text: 'Inspector',
      color: 'info'
    },
    'ANALYST': {
      text: 'Analyst',
      color: 'warning'
    },
    'DRIVER': {
      text: 'Driver',
      color: 'success'
    },
    'GATE': {
      text: 'Gate',
      color: 'black'
    },
  };

  const roleLabels: React.ReactNode[] = [];

  roles.map(role => {
    const { text, color }: any = map[role.role];
    roleLabels.push(<Label color={color} key={role.id}>{text}</Label>)
  });

  return roleLabels;

};

const onCreateUserHandler = async () => {
  alert('TO-DO call API')
};

const onCloseCUHandler = () => setCUDialog(false);

const dialogButtons: ButtonConfig[] = [
  {
    title: 'Cancel',
    action: () => {
      setOpenDialog(false);
    },
    sx: {
      mx: 1
    }
  },
  {
    title: 'Disable User',
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

  return (
    <PageLayout
      seoTitle='Users List'
      title='Users Management'
      buttonConfig={{
        visible: true, 
        title: 'Create User', 
        action: () => setCUDialog(true)}
      }>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {

                  return (
                    <TableRow hover key={user.id}>
                      <TableCell>
                        <Typography variant="h5">
                          {user.personalId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              fontSize: `${theme.typography.pxToRem(15)}`,
                              background: `${theme.colors.warning.main}`,
                              color: `${theme.palette.getContrastText(
                                theme.colors.warning.dark
                              )}`,
                              width: 56,
                              height: 56,
                              mr: 1
                            }}
                          >
                            GA
                          </Avatar>                          
                          <Box>
                            <Typography noWrap variant="subtitle2">
                              {user.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{user.email}</Typography>
                      </TableCell>
                      <TableCell>{getUserRoleLabel(user.roles)}</TableCell>
                      <TableCell>
                        <Typography>{format(new Date(), 'MMMM yyyy')}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                          {
                            tableActions.map(action => (
                              <TableAction
                                title={action.title}
                                key={`action-${action.title}`}
                                clickHandler={action.clickHandler}
                                icon={action.icon}
                                colors={action.colors}
                                visible={action.visible} />
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
