import { ContainerModel, Driver } from "@models"
import { searchApi } from "@services/api/searchApi"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router"


export type SearchItem = { [showData: string]: string }

export const useSearch = (searchType:string) => {
  const navigate = useNavigate()
  let searchField = ""
  const [baseList, setBaseList] = useState<SearchItem[]>([])
  const [showField, setShowField] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  
  const handleSearchItem = async (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target
    setSearchValue(value)
    const searchData = {
      searchType,
      searchString: value
    }
    const found = await searchApi.search(searchData)
    switch(searchType) {
      case "containers":
        setShowField("containerNumber")
      break;
      case "drivers":
        setShowField("name")
      break;
    }
    setBaseList(found.data)
  }

  const handleNewItem = () => {
    switch (searchType) {
      case "containers":
        navigate("/main/container-registry")
      break;
      case "drivers":
        navigate("/main/driver-registry")
      break;
    }
    // navigate("container-registration")
    console.log(searchType)

  }

  return {
    handleSearchItem,
    baseList,
    searchField,
    showField,
    searchValue,
    handleNewItem
  }
}