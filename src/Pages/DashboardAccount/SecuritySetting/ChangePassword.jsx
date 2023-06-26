import { useState } from 'react';
import { useMutation } from 'react-query';
import errorIcon from '../../../Assets/Icon material-error.png';
import successIcon from '../../../Assets/Path 5449.png';
import { changePassword } from '../../../Query/queryFunctions';

const ChangePassword = () => {
 const [password, setPassword] = useState('');
 const [oldPassword, setOldPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');

 const mutation = useMutation(changePassword, {
  onSuccess: (data) => {
   setSuccess(data.message);
  },
 });

 const { isError, error: serverError } = mutation;

 const validate = () => {
  let errors = {};
  let isValid = true;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (oldPassword === '') {
   isValid = false;
   errors['oldPassword'] = 'Please enter old password.';
  }

  if (password === '') {
   isValid = false;
   errors['password'] = 'Please enter new password.';
  }

  if (confirmPassword === '') {
   isValid = false;
   errors['confirmPassword'] = 'Please re-enter new password.';
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

  setError(errors);

  return isValid;
 };
 const onSubmit = () => {
  if (validate()) {
   const data = {
    password: password,
    oldPassword: oldPassword,
    confirmPassword: confirmPassword,
   };
   mutation.mutate(data);
  }
 };

 return (
  <div className='ss_container'>
   <div className='ss_md'>
    <div className='ss_sd'>
     <h6>SECURITY SETTINGS</h6>
     <h5>CHANGE PASSWORD</h5>
     <div className='ss_inp'>
      <input
       type='text'
       placeholder='Old Password'
       onChange={(e) => {
        setOldPassword(e.target.value);
        setError({ ...error, oldPassword: '' });
       }}
      />
      {error.oldPassword && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.oldPassword}</p>
       </div>
      )}
      <input
       type='text'
       placeholder='New Password'
       onChange={(e) => {
        setPassword(e.target.value);
        setError({ ...error, password: '' });
       }}
      />
      {error.password && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.password}</p>
       </div>
      )}
      <input
       type='text'
       placeholder='Confirm New Password'
       onChange={(e) => {
        setConfirmPassword(e.target.value);
        setError({ ...error, confirmPassword: '' });
       }}
      />
      {error.confirmPassword && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.confirmPassword}</p>
       </div>
      )}
     </div>
     {!error.password &&
      !error.confirmPassword &&
      !error.oldPassword &&
      isError && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{serverError.message.split(',')[0]}</p>
       </div>
      )}
     {success && (
      <div className='getSuccess_md_start'>
       <img src={successIcon} alt='...' />

       <p>{success}</p>
      </div>
     )}
     <div className='ss_btn'>
      <button className='cus_blue_btn' onClick={onSubmit}>
       Change Password
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default ChangePassword;
