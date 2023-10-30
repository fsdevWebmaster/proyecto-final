import { useEffect, useState } from "react"
import { Role } from '../../models/Role/Role';
import { roleApi } from "@services/api/roleApi";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { User } from "@models/User/User";

interface Props {
  roles: Role[]
  sendSelected: (selected:Role[]) => void
  updatingUser?: User | null
}

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
    <div>
      { availableRoles && availableRoles.map((role, i) =>(
        <div key={ role.id }>
          <p onClick={ () => addRole(role, i) }>
            { role.name }
          </p>
        </div>
      ))}

      <Typography
        variant="h3"
        sx={{
              mb: 1
        }}
      >

        {t('Selected')}
      </Typography>      

      { selectedRoles && selectedRoles.map((sRole, i) =>(
        <div key={ sRole.id }>
          <p onClick={ () => removeRole(sRole, i) }>
            { sRole.name }
          </p>
        </div>
      ))}
    </div>      
  )
}