import { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import closeEye from '../../Assets/Icon awesome-eye-slash.png';
import openEye from '../../Assets/Icon awesome-eye.png';
import errorIcon from '../../Assets/Icon material-error.png';
import successIcon from '../../Assets/Path 5449.png';
import forgotMan from '../../Assets/undraw_my_password_d6kg.png';
import { resetPassword } from '../../Query/queryFunctions';

const ResetPasswordForm = ({ res }) => {
 const [error, setError] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [togglePassword, setTogglePassword] = useState(false);
 const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
 const [success, setSuccess] = useState('');
 const history = useHistory();

 const mutation = useMutation(resetPassword, {
  onSuccess: (data) => {
   if (data.success) {
    setSuccess(data.message);
   } else setError({ ...error, message: data.message });
  },
 });

 const handleSubmit = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
  });
  if (validate()) {
   const data = {
    id: params.id,
    password: password,
    token: params.token,
   };
   mutation.mutate(data);
  }
 };

 const { isError, error: serverError } = mutation;

 const validate = () => {
  let errors = {};
  let isValid = true;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (password === '') {
   isValid = false;
   errors['password'] = 'Please enter password.';
  }
  if (password !== '' && confirmPassword !== '') {
   if (confirmPassword !== password) {
    isValid = false;
    errors['confirmPassword'] = "Confirm password doesn't match with password.";
   } else {
    if (password.length < 8) {
     isValid = false;
     errors['password'] = 'Password must be 8 or more characters in length.';
    } else if (password.search(/[A-Z]/) < 0) {
     isValid = false;
     errors['password'] =
      'Password must contain 1 or more uppercase characters.';
    } else if (password.search(/[a-z]/) < 0) {
     isValid = false;
     errors['password'] =
      'Password must contain 1 or more lowercase characters.';
    } else if (password.search(/[0-9]/) < 0) {
     isValid = false;
     errors['password'] = 'Password must contain 1 or more digit characters.';
    } else if (!format.test(password)) {
     isValid = false;
     errors['password'] = 'Password must contain 1 or more special characters.';
    }
   }
  }

  if (confirmPassword === '') {
   isValid = false;
   errors['confirmPassword'] = 'Please enter cofirm password.';
  }

  setError(errors);

  return isValid;
 };
 return (
  <div className='account_form_container'>
   <div className='account_form_md'>
    <div className='account_form_sd'>
     <div className='form_head_md'>
      <div>
       <h4 className='fw-bold'>{res?.user_password?.reset_password_title}</h4>
      </div>
     </div>
     <div className='forgot_main_img'>
      <img src={forgotMan} alt='...' />
      <p className='form_blue_para'>
       {res?.user_password?.reset_password_description}
      </p>
     </div>
     <div className='home_form_div_sd'>
      <div className='eye_md'>
       <input
        type={togglePassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
         setPassword(e.target.value);
         setError({ ...error, password: '' });
        }}
        placeholder='New password'
       />
       <img
        src={togglePassword ? openEye : closeEye}
        id='edit-verify-email'
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
      <div className='eye_md'>
       <input
        type={toggleConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => {
         setConfirmPassword(e.target.value);
         setError({ ...error, confirmPassword: '' });
        }}
        placeholder='Confirm new password'
       />
       <img
        src={toggleConfirmPassword ? openEye : closeEye}
        alt='...'
        id='edit-verify-email'
        onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
       />
      </div>
      {error.confirmPassword && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.confirmPassword}</p>
       </div>
      )}
      {!error.password &&
       !error.confirmPassword &&
       !error.oldPassword &&
       !error.message &&
       isError && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{serverError.message}</p>
        </div>
       )}
      {error.message && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>Password reset link is invalid or has expired.</p>
       </div>
      )}
      {success && (
       <div className='getSuccess_md_start'>
        <img src={successIcon} alt='...' />
        <p>{success}</p>
       </div>
      )}
      {success ? (
       <button
        className='home_form_btn mt-4'
        id='green'
        onClick={() => {
         history.push('/login');
        }}
       >
        Login
       </button>
      ) : (
       <button className='home_form_btn mt-4' onClick={handleSubmit}>
        Reset Password
       </button>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default ResetPasswordForm;
