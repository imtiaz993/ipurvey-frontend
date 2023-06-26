import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../Context/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
 const { user } = useAuthContext();

 return (
  <Route
   {...rest}
   render={(props) =>
    !user?.isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
   }
  />
 );
};

export default PrivateRoute;
