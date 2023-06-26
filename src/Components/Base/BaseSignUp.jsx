import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import house from '../../Assets/house-blue.png';
import closeEye from '../../Assets/Icon awesome-eye-slash.png';
import openEye from '../../Assets/Icon awesome-eye.png';
import errorIcon from '../../Assets/Icon material-error.png';
import lock from '../../Assets/lock.png';
import tick from '../../Assets/Path 5449.png';
import { registration } from '../../Query/queryFunctions';

const BaseSignUp = ({ data, refresh, proceed }) => {
  const [_refresh, setUnderscoreRefresh] = useState(10000);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setUnderscoreRefresh(refresh);
  }, []);

  useEffect(() => {
    if (refresh > _refresh) {
      onSubmit();
    }
  }, [refresh]);

  const mutation = useMutation(registration, {
    onSuccess: () => {
      proceed();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isError, error: serverError } = mutation;

  const validate = () => {
    let errors = {
      passwordLength: false,
      passwordCase: false,
      passwordSpec: false,
    };
    let isValid = true;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password === '') {
      isValid = false;
      errors['passwordLength'] = true;
    } else if (password.length < 8) {
      isValid = false;
      errors['passwordLength'] = true;
    }
    if (password.search(/[A-Z]/) < 0) {
      isValid = false;
      errors['passwordCase'] = true;
    } else if (password.search(/[a-z]/) < 0) {
      isValid = false;
      errors['passwordCase'] = true;
    }
    if (password.search(/[0-9]/) < 0) {
      isValid = false;
      errors['passwordSpec'] = true;
    } else if (!format.test(password)) {
      isValid = false;
      errors['passwordSpec'] = true;
    }
    if (firstName === '') {
      isValid = false;
      errors['zerror'] = 'Please enter your first name.';
    } else if (lastName === '') {
      isValid = false;
      errors['zerror'] = 'Please enter your last name.';
    } else if (confirmPassword === '') {
      isValid = false;
      errors['zerror'] = 'Please enter confirm password.';
    } else if (confirmPassword !== password) {
      isValid = false;
      errors['zerror'] = "Confirm password doesn't match with password.";
    } else if (/^\d+$/.test(firstName)) {
      isValid = false;
      errors['zerror'] = 'First name cannot be numbers.';
    } else if (/^\d+$/.test(lastName)) {
      isValid = false;
      errors['zerror'] = 'Last name cannot be numbers.';
    } else if (/^[!@#$%^&*|<>#~()=+{}/\_-]+$/.test(firstName)) {
      isValid = false;
      errors['zerror'] = 'First name cannot be special characters.';
    } else if (/^[!@#$%^&*|<>#~()=+{}/\_-]+$/.test(lastName)) {
      isValid = false;
      errors['zerror'] = 'Last name cannot be special characters.';
    }
    setError(errors);
    return isValid;
  };
  const onSubmit = () => {
    if (validate()) {
      const existing = JSON.parse(localStorage.getItem('travelModel'));
      const data = {
        email: existing.email,
        firstName: firstName,
        lastName: lastName,
        matchingPassword: confirmPassword,
        password: password,
      };
      mutation.mutate(data);
    }
  };

  return (
    <div className='base-singup-container'>
      <img src={house} alt='house' className='mb-2' />
      <h3 id='h3'>Let's get you on board!</h3>
      <p id='grey-para'>Let's get to know each other and secure your account!</p>
      <div className='account_form_sd'>
        <div className='flex-row'>
          <div>
            <label className='medium ft-s'>First Name</label>
            <input
              className='signup-input '
              id='white-center-icon'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className='medium ft-s'>Last Name</label>
            <input
              className='signup-input'
              id='white-center-icon'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className='flex-row'>
          <div className='eye_md'>
            <label className='medium ft-s'>Password</label>
            <input
              className='signup-input'
              id='white-center-icon'
              type={togglePassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={togglePassword ? openEye : closeEye}
              alt='...'
              onClick={() => {
                setTogglePassword(!togglePassword);
                setError({ ...error, password: '' });
              }}
            />
          </div>
          <div className='eye_md'>
            <label className='medium ft-s'>Confirm Password</label>
            <input
              className='signup-input'
              id='white-center-icon'
              type={toggleConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError({ ...error, confirmPassword: '' });
              }}
            />
            <img
              src={toggleConfirmPassword ? openEye : closeEye}
              alt='...'
              onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
            />
          </div>
        </div>
        <div className='flex-r'>
          <img src={lock} alt='lock' className='lock' />
          <p className='medium mt-4'>Password must contain</p>
        </div>
        <div className='flex-r mb-2'>
          <img
            src={
              error.passwordLength == true
                ? errorIcon
                : error.passwordLength == false && tick
            }
            className='another-base-tick mr-2'
          />
          <p
            className={
              error.passwordLength == true
                ? 'red m-0'
                : error.passwordLength == false && 'green m-0'
            }
            id={error.passwordLength == undefined && 'grey-para'}
          >
            At least 8 characters
          </p>
        </div>
        <div className='flex-r mb-2'>
          <img
            src={
              error.passwordCase == true
                ? errorIcon
                : error.passwordCase == false && tick
            }
            className='another-base-tick mr-2'
          />
          <p
            className={
              error.passwordCase == true
                ? 'red m-0'
                : error.passwordCase == false && 'green m-0'
            }
            id={error.passwordCase == undefined && 'grey-para'}
          >
            One upper case and one lower case letter
          </p>
        </div>
        <div className='flex-r mb-2'>
          <img
            src={
              error.passwordSpec == true
                ? errorIcon
                : error.passwordSpec == false && tick
            }
            className='another-base-tick mr-2'
          />
          <p
            className={
              error.passwordSpec == true
                ? 'red m-0'
                : error.passwordSpec == false && 'green m-0'
            }
            id={error.passwordSpec == undefined && 'grey-para'}
          >
            One special character
          </p>
        </div>
        {error.zerror && (
          <div className='flex-r mb-2' id='text-center'>
            <img className=' another-base-tick mr-2' src={errorIcon} alt='...' />
            <p className='red m-0'>{error.zerror}</p>
          </div>
        )}
        {isError && (
          <>
            <div className='flex-r mb-2v' id='text-center'>
              <img className=' another-base-tick mr-2' src={errorIcon} alt='...' />
              <p className='red m-0'>{serverError?.message.split(',')[0]}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BaseSignUp;
