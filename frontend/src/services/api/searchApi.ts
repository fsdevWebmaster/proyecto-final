import { axiosClient } from "../axiosClient";

interface ISearchData {
  searchType: string
  searchString: string
}

class SearchApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    search(searchData: ISearchData) {
      return axiosClient.post(`${this.controller}/search`, searchData)
    }


}

export const searchApi = new SearchApi();