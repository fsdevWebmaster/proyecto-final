import { useEffect, useState } from "react"
import { Role } from '../../models/Role/Role';
import { Box, Chip, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { User } from "@models/User/User";

interface Props {
  roles: Role[]
  sendSelected: (selected:Role[]) => void
  updatingUser?: User | null
}

const RolesContainer = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    margin-top: 25px;
  `
)

const RolesColumn = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column
  `
)

export const RolesSelector = ({ roles, sendSelected, updatingUser }: Props) => {
  const { t }: { t: any } = useTranslation();
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [availableRoles, setAvailableRoles] = useState(roles)

  const addRole = (selected:Role, i: number) => {
    let availableClone = [...availableRoles]
    let selectedClone = [...selectedRoles]
    if (!selectedClone.includes(selected)) {
      selectedClone = [...selectedClone, selected]
      setSelectedRoles(selectedClone)
      sendSelected(selectedClone)
    }
    availableClone.splice(i, 1)
    setAvailableRoles(availableClone)
  }

  const removeRole = (selected:Role, i:number) => {
    let availableClone = [...availableRoles]
    let selectedClone = [...selectedRoles]
    availableClone = [...availableClone, selected]
    selectedClone.splice(i, 1)
    setSelectedRoles(selectedClone)
    setAvailableRoles(availableClone)
    sendSelected(selectedClone)
  }

  useEffect(() => {
    if (updatingUser) {
      setSelectedRoles(updatingUser.roles)
      const availableClone = [...availableRoles]
      updatingUser.roles.map((uRole) => {
        availableClone.map((avcItem, i) => {
          if (avcItem.id === uRole.id) {
            availableClone.splice(i, 1)
          }
        })
      })
      setAvailableRoles(availableClone)
    }
  }, [updatingUser])
  

  return (
    <RolesContainer>
      <RolesColumn>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontSize: '20px'
          }}
          color={'secondary'}
        >
          {t('Roles')}
        </Typography>

        { availableRoles && availableRoles.map((role, i) =>(
          <div key={ role.id }>
            <Chip 
              label={ role.name } 
              variant="outlined"
              onClick={() => addRole(role, i)} 
              sx={{ 
                marginBottom: '5px',
                fontSize: '10px'
              }}
            />
          </div>
        ))}
      </RolesColumn>
      <RolesColumn>
        <Typography
          variant="h3"
          sx={{
                mb: 1,
                fontSize: '20px'
          }}
          color={'secondary'}
        >
          {t('Selected')}
        </Typography>      

        { selectedRoles && selectedRoles.map((sRole, i) =>(
          <div key={ sRole.id }>
            <Chip 
              label={ sRole.name } 
              onClick={() => removeRole(sRole, i)} 
              sx={{ 
                marginBottom: '5px',
                fontSize: '10px'
              }}
            />
          </div>
        ))}
      </RolesColumn>
    </RolesContainer>      
  )
}