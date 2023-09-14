import { useTranslation } from 'react-i18next';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'

import { ContainerModel } from "@models/Container/Container";
import { useSearch } from './useSearch';
import { number, string } from 'yup';



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






type Props = {
  items: []

  sendSelected: (selectedItem:ContainerModel) => void
  searchType: string
}



export const SearchFrom = ({ sendSelected }: Props) => {

  const { t }: { t: any } = useTranslation()

  const handleSelected = (e:any, container:ContainerModel) => {
    sendSelected(container)
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
        {t('Search container')}
      </Typography>    
    <Box>
      <TextField 
        name="containerNumber" 
        onChange={handleSearchItem}
        fullWidth
      />

      <List>
        { containers.map(container =>(
          <Box key={container.id} >
            <ListItem>
              <ListItemButton onClick={(e) => handleSelected(e, container)}>
                <ListItemText primary={container.containerNumber} />
              </ListItemButton>
            </ListItem>
            <Divider/>
          </Box>
        ))}
      </List>
    </Box>
    </>
  )
}
