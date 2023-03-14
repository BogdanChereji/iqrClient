import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../Store';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
