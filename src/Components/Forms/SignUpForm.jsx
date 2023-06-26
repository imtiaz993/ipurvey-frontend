import FacebookLogin from '@greatsumini/react-facebook-login';
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import orLine from '../../Assets/Group 3483.png';
import fb from '../../Assets/Group 833.png';
import closeEye from '../../Assets/Icon awesome-eye-slash.png';
import openEye from '../../Assets/Icon awesome-eye.png';
import errorIcon from '../../Assets/Icon material-error.png';
import { useAuthContext } from '../../Context/authContext';
import { getUserData, registration } from '../../Query/queryFunctions';
import http from '../../Service/http';
import { API_URL } from '../../Utils/constants';

const SignUpForm = ({ data }) => {
  const { user, setUser } = useAuthContext();

  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [googleError, setGoogleError] = useState('');

  useEffect(() => {
    if (user?.isAuthenticated && !user?.firstTime) {
      userMutation.mutate();
    }
    if (user?.isAuthenticated && user?.firstTime) {
      history.push('/user-address');
    }
  }, [user?.isAuthenticated, user?.firstTime]);

  const mutation = useMutation(registration, {
    onSuccess: () => {
      localStorage.setItem('verify-email', email);
      onRedirect('/verify-email');
    },
    onError: (error) => {
      console.log(error);
      setError(error.message);
    },
  });

  const { isLoading, isError, error: serverError } = mutation;

  const onRedirect = (redirect) => {
    history.push(redirect);
  };
  const validate = () => {
    let errors = {};
    let isValid = true;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (firstName === '') {
      isValid = false;
      errors['firstName'] = 'Please enter first name.';
    } else if (/^\d+$/.test(firstName)) {
      isValid = false;
      errors['firstName'] = 'First name cannot be numbers.';
    } else if (/^[!@#$%^&*|<>#~()=+{}/\_-]+$/.test(firstName)) {
      isValid = false;
      errors['firstName'] = 'First name cannot be special characters.';
    }

    if (lastName === '') {
      isValid = false;
      errors['lastName'] = 'Please enter last name.';
    } else if (/^\d+$/.test(lastName)) {
      isValid = false;
      errors['lastName'] = 'Last name cannot be numbers.';
    } else if (/^[!@#$%^&*|<>#~()=+{}/\_-]+$/.test(lastName)) {
      isValid = false;
      errors['lastName'] = 'Last name cannot be special characters.';
    }

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
  const onSubmit = () => {
    if (validate()) {
      const data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        matchingPassword: confirmPassword,
        password: password,
      };
      mutation.mutate(data);
    }
  };
  const userMutation = useMutation(getUserData, {
    onSuccess: (response) => {
      console.log(response)
      if (response.customerDetailsResponse === null) {
        history.push('/user-address');
      } else {
        history.push('/dashboard');
      }
    }
  });
  const loginUsingGoogleAuth = async (googleAccessToken) => {
    try {
      const response = await http.get(
        `${API_URL.UMS}/auth/social/google?token=${googleAccessToken}`
      );
      if (response) {
        setUser({
          ...user,
          isAuthenticated: true,
          token: response?.accessToken,
          refreshToken: response?.refreshToken,
          expire: response?.expiresIn,
          tokenLife: Math.floor(Date.now() / 1000),
          accountType: 'google',
        });
      }
    } catch (error) {
      setGoogleError(error.message);
    }
  };
  const loginUsingFacebookAuth = async (facebookAccessToken) => {
    try {
      const response = await http.get(
        `${API_URL.UMS}/auth/social/facebook?token=${facebookAccessToken}`
      );
      if (response) {
        setUser({
          ...user,
          isAuthenticated: true,
          token: response?.accessToken,
          refreshToken: response?.refreshToken,
          expire: response?.expiresIn,
          tokenLife: Math.floor(Date.now() / 1000),
          accountType: 'facebook',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const FacebookBtn = ({ onClick }) => (
    <button className='acc_blue_btn' onClick={onClick}>
      <img src={fb} alt='fb' />
      Signup using Facebook
    </button>
  );
  return (
    <div className='account_form_container'>
      <div className='account_form_md'>
        <div className='account_form_sd'>
          <div className='form_head_md'>
            <div>
              <h4> {data?.auth?.signup}</h4>
            </div>
          </div>
          <div className='sign_up_btns'>
            <FacebookLogin
              appId='136670628516723'
              fields='name,email,picture'
              onSuccess={(response) => loginUsingFacebookAuth(response.accessToken)}
              render={({ onClick }) => <FacebookBtn onClick={onClick} />}
            />
            <GoogleLogin
              className='acc_wht_btn googleLogin_btn'
              clientId='830826723708-eb5ocfrg6fc67u51ta2cbbgpuvamhskv.apps.googleusercontent.com'
              buttonText='Signup using Google'
              onSuccess={(response) => loginUsingGoogleAuth(response.accessToken)}
              onFailure={(error) => console.log(error)}
            />
          </div>
          <div className='orLine_md'>
            <img src={orLine} alt='...' />
          </div>
          {isError && (
            <>
              {serverError?.message.split(',').map((error) => (
                <div className='getError_md_start'>
                  <img src={errorIcon} alt='...' />
                  <p>{error}</p>
                </div>
              ))}
            </>
          )}
          {googleError && (
            <div className='getError_md_start'>
              <img src={errorIcon} alt='...' />
              <p>{googleError}</p>
            </div>
          )}
          <div className='home_form_div_sd'>
            <div className='acc_name_inp'>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
              />
              <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Last Name'
              />
            </div>
            {error.firstName && error.lastName && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>{error.firstName}</p>
              </div>
            )}
            {!error.lastName && error.firstName && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>{error.firstName}</p>
              </div>
            )}
            {!error.firstName && error.lastName && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>{error.lastName}</p>
              </div>
            )}
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
                onClick={() => {
                  setTogglePassword(!togglePassword);
                  setError({ ...error, password: '' });
                }}
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
                placeholder='Confirm Password'
              />
              <img
                id='edit-verify-email'
                src={toggleConfirmPassword ? openEye : closeEye}
                alt='...'
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
              />
            </div>
            {error.confirmPassword && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>{error.confirmPassword}</p>
              </div>
            )}

            <button onClick={onSubmit} className='home_form_btn' disabled={isLoading}>
              {!isLoading ? 'Next' : <CircularProgress size={20} color='primary' />}
            </button>
            <div className='notMember_para'>
              <p>
                Already a member?{' '}
                <Link className='link' to='/login'>
                  login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
