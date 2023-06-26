import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import closeEye from '../../Assets/Icon awesome-eye-slash.png';
import openEye from '../../Assets/Icon awesome-eye.png';
import errorIcon from '../../Assets/Icon material-error.png';
import headImg from '../../Assets/undraw_Order_confirmed_re_g0if_light.png';
import { useAuthContext } from '../../Context/authContext';
import { login, registrationConfirm } from '../../Query/queryFunctions';

const VerificationSuccessForm = ({ res }) => {
 const history = useHistory();
 const location = useLocation();
 const token = new URLSearchParams(location.search).get('token');

 const { user, setUser } = useAuthContext();
 const [email, setEmail] = useState('');
 const [method, setMethod] = useState('');
 const [password, setPassword] = useState('');
 const [rememberMe, setRememberMe] = useState(true);
 const [togglePassword, setTogglePassword] = useState(false);
 const [error, setError] = useState('');

 const mutation = useMutation(login, {
  onSuccess: (response) => {
   if (response.status !== '401') {
    setUser({
     ...user,
     isAuthenticated: true,
     token: response?.accessToken,
     refreshToken: response?.refreshToken,
     expire: response?.expiresIn,
     tokenLife: Math.floor(Date.now() / 1000),
     accountType: 'email',
    });
    localStorage.removeItem('verification-method');
    localStorage.removeItem('verify-email');
   }
  },
 });

 const tokenMutation = useMutation(registrationConfirm);
 const {
  isSuccess: tokenSuccess,
  isLoading: tokenLoading,
  data,
 } = tokenMutation;

 const {
  isSuccess,
  isLoading,
  isError,
  error: serverError,
  data: serverResponse,
 } = mutation;

 useEffect(() => {
  if (user?.isAuthenticated) {
   const session = sessionStorage.getItem('strapiId');
   if (session !== null) {
    history.push('/plan');
   } else {
    history.push('/user-address');
   }
  }
  tokenMutation.mutate(token);
 }, [user?.isAuthenticated]);

 useEffect(() => {
  const method = localStorage.getItem('verification-method');
  if (method) {
   setMethod(method);
  } else {
   setMethod('normal');
  }
 }, []);

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

  if (password === '') {
   isValid = false;
   errors['password'] = 'Please enter password.';
  }

  setError(errors);

  return isValid;
 };

 const onSubmit = (e) => {
  if (validate()) {
   const data = {
    email: email,
    password: password,
   };
   mutation.mutate(data);
  }
 };
 if (tokenLoading) {
  return (
   <div className='account_form_container'>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
     <CircularProgress />
    </div>
   </div>
  );
 }
 if (tokenSuccess && data.success && method == 'base') {
  return <Redirect to='/travel-claim?verify=true' />;
 }
 return (
  <div className='account_form_container'>
   {tokenSuccess && !data.success ? (
    <div className='getError_md'>
     <img src={errorIcon} alt='...' />
     <p>{data.message}</p>
    </div>
   ) : (
    <div className='account_form_md'>
     <div className='account_form_sd'>
      <div className='form_head_md'>
       <h2 className='vfy_email_header'>
        {res?.email_verification?.verification_success_title}
       </h2>
       <img src={headImg} alt='...' />
       <p className='vfy_email_body'>
        {res?.email_verification?.verification_success_description}
       </p>
       {isSuccess && serverResponse.status === '401' ? (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{serverResponse.message}</p>
        </div>
       ) : (
        isError && (
         <div className='getError_md_start'>
          <img src={errorIcon} alt='...' />
          <p>{serverError.error}</p>
         </div>
        )
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
        <div className='eye_md'>
         <input
          type={togglePassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
         />
         <img
          id='edit-verify-email'
          src={togglePassword ? openEye : closeEye}
          alt='...'
          onClick={() => setTogglePassword(!togglePassword)}
         />
        </div>
        {error.password && (
         <div className='getError_md_start'>
          <img src={errorIcon} alt='...' />
          <p>{error.password}</p>
         </div>
        )}
        <div style={{ marginBottom: '15px', marginTop: '15px' }}>
         <div className='remember_chck_md'>
          <div>
           <input
            type='checkbox'
            name=''
            id=''
            onChange={() => setRememberMe(!rememberMe)}
           />
           <p>Remember me</p>
          </div>
          <Link className='form_link' to='/forgot'>
           Forgot password?
          </Link>
         </div>
        </div>
        <button
         className='home_form_btn'
         onClick={onSubmit}
         disabled={isLoading}
        >
         {!isLoading ? 'Login' : <CircularProgress size={20} color='primary' />}
        </button>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default VerificationSuccessForm;
