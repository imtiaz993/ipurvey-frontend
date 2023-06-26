import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import arrow from '../../Assets/Icon feather-arrow-rightw.png';
import errorIcon from '../../Assets/Icon material-error.png';
import { useAuthContext } from '../../context/authContext';

const OneStepAway = ({ data }) => {
 const [check, setCheck] = useState(false);
 const [refNo, setrefNo] = useState('');
 const [error, setError] = useState('');
 const history = useHistory();
 const { user } = useAuthContext();

 const validate = ({ type }) => {
  let errors = {};
  let isValid = true;
  if (refNo === '') {
   isValid = false;
   errors.refNo = 'Please enter Booking Reference number';
  }
  if (check === false) {
   isValid = false;
   errors.check =
    'You must agree to Terms and Conditions and Privacy and Data Policy';
  }
  setError(errors);
  if (isValid) {
   const config = JSON.parse(localStorage.getItem('travelModel'));
   config.refNo = refNo;
   localStorage.setItem('travelModel', JSON.stringify(config));
   if (type === 'login') {
    history.push('/login');
   } else if (type === 'signup') {
    history.push('/signup');
   } else if (type === 'auth') {
    history.push('/payment/summary');
   }
  }
  return isValid;
 };

 return (
  <div className='steper_form_container'>
   <div className='stepper_form_md'>
    <div className='stepper_form'>
     <h2 style={{ fontSize: '1.1rem' }}>{data?.form?.one_step}</h2>
     <p className='stpr_email_para'>{data?.form?.one_step_description}</p>
     <p className='refrence_num'>{data?.form?.booking_number}</p>
     <div className='stp_inp' id='specail'>
      <input
       type='text'
       name='date'
       id='date'
       value={refNo}
       onChange={(e) => {
        setrefNo(e.target.value);
        setError({ ...error, refNo: '' });
       }}
       placeholder='12345678'
      />
     </div>
     {error.refNo && (
      <div className='getError_md_start'>
       <img src={errorIcon} alt='...' />
       <p>{error.refNo}</p>
      </div>
     )}

     <div className='accept_privacy ml-4'>
      <input
       className='form-check-input'
       type='checkbox'
       name='accept'
       value={check}
       onChange={() => {
        setCheck(!check);
        setError({ ...error, check: '' });
       }}
       id='flexCheckDefault'
      />
      <p>
       I agree to the iPurvey{' '}
       <Link to='/terms' target='_blank' className='stp_link'>
        {' '}
        Terms and Conditions{' '}
       </Link>
       and{' '}
       <Link to='/privacy' target='_blank' className='stp_link'>
        Privacy & Data Policy{' '}
       </Link>
      </p>
     </div>
     {error.check && (
      <div className='getError_md_start'>
       <img src={errorIcon} alt='...' />
       <p>{error.check}</p>
      </div>
     )}
     {!user?.isAuthenticated ? (
      <div className='stp_btns'>
       <span className='stp_link'>
        <button
         className='home_form_btn'
         onClick={() => validate({ type: 'signup' })}
        >
         Sign Up to iPurvey <img src={arrow} alt='...' />
        </button>
       </span>
       <button className='stp_back' onClick={() => validate({ type: 'login' })}>
        Already a member? <span className='stp_link'>Login</span>
       </button>
      </div>
     ) : (
      <div className='stp_btns'>
       <span className='stp_link'>
        <button
         className='home_form_btn'
         onClick={() => validate({ type: 'auth' })}
        >
         Continue <img src={arrow} alt='...' />
        </button>
       </span>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default OneStepAway;
