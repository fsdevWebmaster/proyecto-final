import { useTranslation } from 'react-i18next';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography, IconButton, Alert, Button } from '@mui/material';

import { ContainerModel, Driver } from "@models";
import { SearchItem, useSearch } from './useSearch';

type Props = {
  sendSelected: (selectedItem:SearchItem) => void
  searchType: string
  formTitle: string
}

export const SearchForm = ({ sendSelected, searchType, formTitle }: Props) => {
  const { t }: { t: any } = useTranslation()
  const { handleSearchItem, baseList, showField, searchValue } = useSearch(searchType)

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
        {t(`${ formTitle }`)}
        { searchValue }
      </Typography>    
    <Box>
      <TextField 
        name="seachField" 
        onChange={(e) => handleSearchItem(e)}
        fullWidth
      />
      { searchValue && baseList.length > 0 &&
        <List>
          { baseList.map(item =>(
            <Box key={item[showField]} >
              <ListItem>
                <ListItemButton onClick={(e) => handleSelected(e, item)}>
                  <ListItemText primary={item[showField]} />
                </ListItemButton>
              </ListItem>
              <Divider/>
            </Box>
          ))}
        </List>
      }
      { searchValue && baseList.length === 0 &&
        <Alert severity="info" sx={{ display: "flex", alignItems: "center" }}>
          No se ha encontado ningún resultado
          <Button>Crear nuevo</Button>
        </Alert>
      }
    </Box>
    </>
  )
}


// const container = {
//   id: string,
//   }
//   const driver = {
//   idDoc: string;
//   }
//   jose manuel Zuñiga21:03
//   function castItem (item, type) {
//     const castObj = {};
//     switch(type) {
//       case 'driver':
//         Object.assign(castObj, {
//           id: item.idDoc
//         })
//       break;
  
//       case 'container':
//         Object.assign(castObj, {
//           id: item.idContainer
//         })      
//         break;
  
//         //user
//       default:
//         Object.assign(castObj, {
//           id: item.ced
//         })      
//         break;
//     }
  
//     return castObj;
//   }
//   jose manuel Zuñiga21:04
//   type CastItem {
//   id: string,
//   name: string;
//   }

