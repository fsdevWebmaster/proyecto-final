import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = (instance: AxiosInstance | null = null): AxiosInstance => {
  /*
   review vite proxy configuration
  const viteEnv = import.meta.env.VITE_APP_APIS;
  const baseURL = viteEnv;

  const axiosInterceptors = axios.create({
    baseURL,
  });*/

  const baseURL = 'https://pfm-backend.onrender.com';
  const axiosInterceptors = axios.create({
    baseURL,
  });

  const axiosSetup = instance || axiosInterceptors

  const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    //console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  }

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
      console.error(`[request error] [${JSON.stringify(error)}]`);
      return Promise.reject(error);
  }

  const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => new Promise((resolve, reject) => resolve(response));

  const onErrorResponse = (error: AxiosError) => {
    if (!error.response) {
      return new Promise((resolve, reject) => reject(error));
    }

    if (error.response.status === 403) {
        localStorage.removeItem('accTkn');
        window.location.replace("/login");
    } else {
        return new Promise((resolve, reject) => reject(error))
    }    
  }

  axiosSetup.interceptors.request.use(onRequest, onRequestError);
  axiosSetup.interceptors.response.use(onResponse, onErrorResponse);

  return axiosSetup;
}

export const axiosClient = axiosInstance();