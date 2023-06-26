import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import edit from '../../Assets/Icon awesome-edit.png';
import errorIcon from '../../Assets/Icon material-error.png';
import successIcon from '../../Assets/Path 5449.png';
import headImg from '../../Assets/undraw_envelope_re_f5j4@2x.png';
import { resendVerificationEmail } from '../../Query/queryFunctions';

const VerifyEmailForm = ({ res }) => {
 const history = useHistory();
 const [email, setEmail] = useState(
  localStorage.getItem('verify-email')
   ? localStorage.getItem('verify-email')
   : ''
 );
 const [error, setError] = useState('');
 const timer = 30;
 const [seconds, setSeconds] = useState(timer);
 const [reset, setReset] = useState(false);

 const mutation = useMutation(resendVerificationEmail);
 const { isLoading, isError, error: serverError, isSuccess, data } = mutation;

 useEffect(() => {
  if (!localStorage.getItem('verify-email')) {
   onRedirect('/');
  } else {
   localStorage.setItem('verification-method', 'normal');
  }
  if (seconds > 0) {
   setTimeout(() => setSeconds(seconds - 1), 1000);
  } else {
   setReset(true);
  }
 }, [seconds]);

 const onRedirect = (redirect) => {
  history.push(redirect);
 };
 const validate = () => {
  let errors = {};
  let isValid = true;

  if (email === '') {
   isValid = false;
   errors['email'] = 'Please enter email address.';
  }

  if (email !== '') {
   let pattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   );
   if (!pattern.test(email)) {
    isValid = false;
    errors['email'] = 'Please enter a valid email address.';
   }
  }
  setError(errors);

  return isValid;
 };

 const onResend = (e) => {
  e.preventDefault();
  if (validate()) {
   mutation.mutate(email);
   setReset(false);
   setSeconds(timer);
  }
 };
 return (
  <div className='account_form_container'>
   <div className='account_form_md'>
    <div className='account_form_sd'>
     <div className='form_head_md'>
      <h2 className='vfy_email_header'>
       {res?.email_verification?.verify_email_title}
      </h2>
      <img src={headImg} alt='...' />
      <p className='vfy_email_heading'>
       {res?.email_verification?.verify_email_description}
      </p>
      <p className='vfy_email_body'>
       {res?.email_verification?.verification_link_sent}
      </p>
      <div className='home_form_div_sd'>
       {isSuccess && (
        <div className='getSuccess_md_start'>
         <img src={successIcon} alt='...' />
         <p>{data.message}</p>
        </div>
       )}

       {isError && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{serverError.error}</p>
        </div>
       )}
       <div className='eye_md'>
        <input
         type='email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder='Email Address'
         disabled={true}
        />
        {/* <img src={edit} alt='...' id='edit-verify-email' /> */}
       </div>
       {error.email && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.email}</p>
        </div>
       )}
      </div>
      <div className='vfy_email_footer'>
       <p className='text'>Didn't receive an email?</p>
       {!reset ? (
        <p className='timer'>
         Resend Email (00:{seconds > 9 ? seconds : '0' + seconds})
        </p>
       ) : (
        <button
         className='home_form_btn'
         onClick={onResend}
         disabled={isLoading}
        >
         {!isLoading ? (
          'Resend Email'
         ) : (
          <CircularProgress size={20} color='primary' />
         )}
        </button>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default VerifyEmailForm;
