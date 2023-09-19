import { useTranslation } from 'react-i18next';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography, IconButton, 
  Alert, Button, Grid, TableCell, Card, TableContainer, Table, TableHead, TableRow, TableBody, useTheme 
} from '@mui/material';

import { ContainerModel, Driver } from "@models";
import { SearchItem, useSearch } from './useSearch';
import { BasicTable } from '@components/Tables/BasicTable';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { TableAction } from '@components/Tables/TableAction';

type Props = {
  sendSelected: (selectedItem:SearchItem) => void
  searchType: string
  formTitle: string
}

export const SearchForm = ({ sendSelected, searchType, formTitle }: Props) => {
  const { t }: { t: any } = useTranslation()
  const { handleSearchItem, baseList, showField, searchValue, handleNewItem } = useSearch(searchType)
  const theme = useTheme();

  const handleSelected = (e:any, item:SearchItem) => {
    sendSelected(item)
  }

  return (
    <>
      <Typography
        fontWeight={'fontWeightMedium'}
        variant="h4"
        mx= {1}
        margin={0}
        marginBottom={1}
      >
      {/* { searchValue } */}
      </Typography>    
    <Box>
      <TextField sx={{ mb: 1 }}
        variant='outlined'
        label={formTitle}
        name="seachField" 
        onChange={(e) => handleSearchItem(e)}
        fullWidth
      />
      { searchValue && baseList.length > 0 &&
        <>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Container number</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { baseList.map(item =>(
                <TableRow hover key={item[showField]}  onClick={(e) => handleSelected(e, item)}>
                  <TableCell align="center">
                    <Typography variant="h5">
                      {item[showField]}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <TableAction
                      title={"Add"}
                      icon={<AddCircleOutlineOutlined/>}
                      colors={{background: theme.colors.primary.main, color: theme.colors.primary.light}}
                      visible={true} 
                      clickHandler={(e) => handleSelected(e, item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        </>
      }
      { searchValue && baseList.length === 0 &&
        <Alert severity="info" sx={{ display: "flex", alignItems: "center" }}>
          <span>No se ha encontado ningún resultado</span>
          <Button onClick={ handleNewItem }>
            Crear nuevo
          </Button>
        </Alert>
      }
    </Box>
    </>
  )
}

