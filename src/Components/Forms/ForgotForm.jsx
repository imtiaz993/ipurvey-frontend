import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import errorIcon from '../../Assets/Icon material-error.png';
import successIcon from '../../Assets/Path 5449.png';
import forgotMan from '../../Assets/undraw_forgot_password_gi2d.png';
import { useAuthContext } from '../../Context/authContext';
import { resetPasswordEmail } from '../../Query/queryFunctions';

const ForgotForm = ({ res }) => {
 const history = useHistory();
 const { user } = useAuthContext();
 const [email, setEmail] = useState('');
 const [error, setError] = useState('');

 const mutation = useMutation(resetPasswordEmail);

 const { isLoading, isError, error: serverError, isSuccess, data } = mutation;

 useEffect(() => {
  if (user?.isAuthenticated) {
   history.push('/dashboard');
  }
 }, [user?.isAuthenticated]);

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (email === '') {
   isValid = false;
   errors['email'] = 'Please enter email address.';
  }

  if (email !== '') {
   let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
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
   mutation.mutate({ email: email });
  }
 };
 return (
  <div className='account_form_container'>
   <div className='account_form_md'>
    <div className='account_form_sd'>
     <div className='form_head_md'>
      <div>
       <h4 className='fw-bold'>{res?.user_password?.forgot_password_title}</h4>
      </div>
     </div>
     <div className='forgot_main_img'>
      <img src={forgotMan} alt='...' />
      <p className='form_blue_para'>
       {res?.user_password?.forgot_password_description}
      </p>
     </div>
     {isSuccess && (
      <div className='getSuccess_md_start'>
       <img src={successIcon} alt='...' />
       <p>
        {data.message.split('<br>').map((message) => (
         <span>{message}</span>
        ))}
       </p>
      </div>
     )}

     <div className='home_form_div_sd'>
      <input
       type='email'
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder='Email Address'
      />
      {error.email && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.email}</p>
       </div>
      )}
      {isError && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>
         {serverError.error === 'No value present'
          ? 'Sorry, we could not find your account.'
          : serverError.error}
        </p>
       </div>
      )}
      <button
       className='home_form_btn magic_link_Btn'
       onClick={onResend}
       disabled={isLoading}
      >
       {!isLoading ? (
        'Get Email'
       ) : (
        <CircularProgress size={20} color='primary' />
       )}
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ForgotForm;
