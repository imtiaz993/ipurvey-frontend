import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './Context/authContext';
import AppRouter from './Router/Router';

function App() {
 return (
  <AuthProvider>
   <AppRouter />
   <ToastContainer />
  </AuthProvider>
 );
}

export default App;
