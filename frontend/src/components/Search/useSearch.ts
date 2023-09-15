import { ContainerModel, Driver } from "@models"
import { ChangeEvent, useState } from "react"

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

export type SearchItem = { [showData: string]: string }

export const useSearch = (searchType:string) => {
  let searchField = ""
  // let showField = ""
  const [baseList, setBaseList] = useState<SearchItem[]>([])
  const [showField, setShowField] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  // const [selected, setSelected] = useState<ContainerModel | null>()
  
  const handleSearchItem = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target
    setSearchValue(value)
    let searchList:SearchItem[] = []

    switch (searchType) {
      case 'containers':
        searchField = "containerNumber"
        searchList = mockContainers
        setShowField("containerNumber")
      break
      case 'drivers':
        searchField = "idDoc"
        setShowField("name")
        searchList = mockDrivers
      break
    }

    if (value) {
      const found = searchList.filter(item => item[searchField].includes(value))
      setBaseList(found)
    }
    else {
      setBaseList([])
    }
  }

  return {
    handleSearchItem,
    baseList,
    searchField,
    showField,
    searchValue
  }
}