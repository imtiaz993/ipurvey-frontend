import { useQuery } from 'react-query';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import headImg from '../../Assets/undraw_Airport_re_oqk1.png';
import { useAuthContext } from '../../Context/authContext';
import { home } from '../../Query/queryFunctions';

const Relax = ({ desc }) => {
 const { user } = useAuthContext();
 const history = useHistory();
 const [email, setEmail] = useState('');
 const onRedirect = (redirect) => {
  history.push(redirect);
 };
 const verifyEmail = localStorage.getItem('verify-email');
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 return (
  <div className='base-form-container'>
   <div className='stepper_form_md'>
    <div className='stepper_form '>
     <img src={headImg} alt='...' className='mb-2' />
     <ReactMarkdown>
      <h2>{Home?.OCH?.sign_up_title}</h2>
     </ReactMarkdown>
     <div className='stp_para' id='grey-para'>
      <p id='grey-para'>{desc}</p>
     </div>
     <div className='flight_num' id='base-email'>
      <input
       type='email'
       name='email'
       id='email'
       placeholder='Email Address'
       disabled={user?.isAuthenticated || verifyEmail}
       value={
        user?.isAuthenticated ? user?.email : verifyEmail ? verifyEmail : email
       }
       readOnly={user?.isAuthenticated}
       onChange={(e) => setEmail(e.target.value)}
      />
     </div>
     <div className='stp_btns'>
      {!user?.isAuthenticated && (
       <button
        className='home_form_btn'
        id='green-btn'
        onClick={() => onRedirect('/signup')}
       >
        {Home?.OCH?.signup_text}
       </button>
      )}
      <button
       className='home_form_btn'
       id='green-btn'
       onClick={() => onRedirect('/')}
      >
       {Home?.OCH?.return_to_home}
      </button>
      <button
       id='grey-para'
       className='stp_back medium mt-3'
       onClick={() => onRedirect('/contact')}
      >
       {Home?.OCH?.contact_support}
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Relax;
