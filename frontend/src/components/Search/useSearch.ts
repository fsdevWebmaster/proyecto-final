import { ContainerModel, Driver } from "@models"
import { ChangeEvent, useState } from "react"

export const useSearch = () => {
  const [containers, setContainers] = useState<ContainerModel[]>([])
  const [selected, setSelected] = useState<ContainerModel | null>()

  const mockContainers:ContainerModel[] = [
    { id: "1", containerNumber: "123" },
    { id: "2", containerNumber: "234" },
    { id: "3", containerNumber: "345" }
  ]
  const mockDrivers:Driver[] = [
    {
      name: 'Fidel',
      idDoc: "91",
      email: "fidel@mail.com"
    },
    {
      name: 'Juan',
      idDoc: "92",
      email: "juan@mail.com"
    }
  ]

  const handleSearchItem = (e:ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    if (value) {
      const found = mockContainers.filter(item => item.containerNumber.includes(value))
      setContainers(found)
    }
    else {
      setContainers([])
    }
  }

  return {
    handleSearchItem,
    containers,
    setContainers
  }
}