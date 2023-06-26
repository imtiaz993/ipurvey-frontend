import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import logoutImg from '../../Assets/logout.png';
import './Logout.css';
import { home, layout } from '../../Query/queryFunctions';
export default function Logout() {
 const history = useHistory();
 const { data: Layout } = useQuery('layout', layout, {
    refetchOnWindowFocus: false,
   });
 return (
  <div className='logout'>
   <img src={logoutImg} />
   <h1>{Layout?.logout?.heading}</h1>
   <p id='grey-para'>
   {Layout?.logout?.description}
   </p>
   <button
    className='home_form_btn medium'
    onClick={() => {
     history.push('/login');
    }}
   >
    {Layout?.logout?.button_text}
   </button>
  </div>
 );
}
