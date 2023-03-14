import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../Store';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;
