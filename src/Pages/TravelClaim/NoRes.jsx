import { useQuery } from 'react-query';
import headImg from '../../Assets/undraw_feeling_blue_4b7q (2).png';
import { useHistory } from 'react-router-dom';
import { home } from '../../Query/queryFunctions';
const NoRes = () => {
 const history = useHistory();
 const onRedirect = (redirect) => {
  history.push(redirect);
 };
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 return (
  <div className='base-form-container'>
   <div className='stepper_form_md'>
    <div className='stepper_form'>
     <img src={headImg} alt='...' />

     <h2>{Home?.OCH?.something_not_right}</h2>
     <div className='stp_para'>
      <p id='grey-para'>{Home?.OCH?.error_text}</p>
     </div>
     <div className='stp_btns'>
      <button
       className='medium home_form_btn'
       id='green-btn'
       onClick={() => onRedirect('/')}
      >
       {Home?.OCH?.try_again}
      </button>
      <button
       className='stp_back medium'
       onClick={() => onRedirect('/contact')}
      >
       {Home?.OCH?.contact}
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default NoRes;
