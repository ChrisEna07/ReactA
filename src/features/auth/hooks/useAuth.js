import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user, token, status } = useSelector((state) => state.auth);

  const login = ({ username, password }) => {
    dispatch(loginUser({ username, password }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    token,
    status,
    login,
    logout: logoutUser,
  };
};
