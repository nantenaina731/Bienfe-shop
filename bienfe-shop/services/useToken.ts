import { useDispatch, useSelector } from "react-redux";
import { addToken, removeToken } from "../store/slice/userSlice";

const useToken = () => {
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  const getAuthToken = () => {
    return user;
  };

  const setAuthToken = (token: any) => {
    dispatch(addToken(token));
  };

  const deleteToken = () => {
    dispatch(removeToken());
  };

  return { token: getAuthToken(), setAuthToken, deleteToken };
};
export default useToken;
