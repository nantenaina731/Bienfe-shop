import axios from "axios";
import { useSelector } from "react-redux";

const BaseApi =  "http://192.168.43.110:9001/api" 
const BaseUrl = "http://192.168.43.110:9001"  

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
