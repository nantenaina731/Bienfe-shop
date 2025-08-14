import axios from "axios";
import { useSelector } from "react-redux";

const BaseApi = "https://bienfe-shop-production.up.railway.app/api"
const BaseUrl = "https://bienfe-shop-production.up.railway.app"

const useHttps = () => {
  const user = useSelector((state: any) => state.user.value)

  const http = axios.create({
    baseURL: BaseApi,
  });

  const https = axios.create({
    baseURL: BaseApi,
    headers: {
      "Authorization": `Bearer ${user && user.token}`
    },
  });

  const httpsFile  = axios.create({
    baseURL: BaseApi,
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${user && user.token}`
    },
  });

  return { http, https, httpsFile };
};

export { BaseUrl };
export default useHttps;
