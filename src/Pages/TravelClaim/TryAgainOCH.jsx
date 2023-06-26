import { useQuery } from 'react-query';
import headImg from '../../Assets/undraw_feeling_blue_4b7q (2).png';
import arrow from '../../Assets/Icon feather-arrow-rightw.png';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/authContext';
import { home } from '../../Query/queryFunctions';

const TryAgain = ({ desc }) => {
 const history = useHistory();
 const { user } = useAuthContext();
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
     <h2>{Home?.OCH?.not_eligible_title}</h2>
     <div className='stp_para'>
      <p id='grey-para'>
       <ReactMarkdown>{desc}</ReactMarkdown>
      </p>
      <div className='stp_para mt-2'>
       <p id='grey-para'>
        {Home?.OCH?.learn_more}{' '}
        <Link className='stp_link' to='/faq'>
         {Home?.OCH?.claim_compensation}
        </Link>
       </p>
      </div>
     </div>
     <div className='stp_btns'>
      {!user?.isAuthenticated && (
       <button
        className='medium home_form_btn'
        id='green-btn'
        onClick={() => onRedirect('/signup')}
       >
        {Home?.OCH?.signup_text}
        <img src={arrow} alt='...' />
       </button>
      )}
      <button className='stp_back medium' onClick={() => onRedirect('/')}>
       {Home?.OCH?.return_to_home}
      </button>
      {/* <button
       className='stp_back medium m-xxl mb--x'
       id='grey-para'
       onClick={() => onRedirect('/travel-claim')}
      >
       Change Flight Details?
      </button> */}
     </div>
    </div>
   </div>
  </div>
 );
};

export default TryAgain;
