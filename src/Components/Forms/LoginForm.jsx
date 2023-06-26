import { useEffect, useState } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { CircularProgress } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import orLine from '../../Assets/Group 3483.png';
import fb from '../../Assets/Group 833.png';
import closeEye from '../../Assets/Icon awesome-eye-slash.png';
import openEye from '../../Assets/Icon awesome-eye.png';
import errorIcon from '../../Assets/Icon material-error.png';
import { useAuthContext } from '../../Context/authContext';
import { getUserData, login } from '../../Query/queryFunctions';
import http from '../../Service/http';
import { API_URL } from '../../Utils/constants';

const LoginForm = ({ data }) => {
  const history = useHistory();
  const { user, setUser } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState('');
  const [googleError, setGoogleError] = useState('');

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
      }
    },
  });

  const userMutation = useMutation(getUserData, {
    onSuccess: (response) => {
      console.log(response)
      if (response.customerDetailsResponse === null) {
        history.push('/user-address');
      } else {
        history.push('/dashboard');
      }
    },
  });

  useEffect(() => {
    if (user?.isAuthenticated) {
      const session = sessionStorage.getItem('strapiId');
      if (session !== null) {
        history.push('/plan');
      } else {
        userMutation.mutate();
      }
    }
  }, [user]);

  const {
    isSuccess,
    isLoading,
    isError,
    data: serverResponse,
    error: serverError,
  } = mutation;

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

  const onSubmit = () => {
    if (validate()) {
      const data = {
        email: email,
        password: password,
      };
      mutation.mutate(data);
    }
  };

  const loginUsingGoogleAuth = async (googleAccessToken) => {
    try {
      const response = await http.get(
        `${API_URL.UMS}/auth/social/google?token=${googleAccessToken}`
      );
      if (response) {
        console.log(response)
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
      setGoogleError(error.message);
    }
  };
  const FacebookBtn = ({ onClick }) => (
    <button className='acc_blue_btn' onClick={onClick}>
      <img src={fb} alt='fb' />
      Login using Facebook
    </button>
  );
  return (
    <div className='account_form_container'>
      <div className='account_form_md'>
        <div className='account_form_sd'>
          <div className='form_head_md'>
            <div>
              <h4>{data?.auth?.login}</h4>
            </div>
          </div>
          <div className='sign_up_btns'>
            <FacebookLogin
              appId='136670628516723'
              fields='name,email,picture'
              onSuccess={(response) => loginUsingFacebookAuth(response.accessToken)}
              onFail={(error) => console.log(error)}
              render={({ onClick }) => <FacebookBtn onClick={onClick} />}
            />
            <GoogleLogin
              className='acc_wht_btn googleLogin_btn'
              clientId='830826723708-eb5ocfrg6fc67u51ta2cbbgpuvamhskv.apps.googleusercontent.com'
              buttonText='Login using Google'
              onSuccess={(response) => loginUsingGoogleAuth(response.accessToken)}
              onFailure={(error) => console.log(error)}
            />
          </div>
          <div className='orLine_md'>
            <img src={orLine} alt='...' />
          </div>
          {isSuccess && serverResponse.status === '401' ? (
            <div className='getError_md_start'>
              <img src={errorIcon} alt='...' />
              <p>{serverResponse.message}</p>
            </div>
          ) : (
            isError && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>
                  {serverError.error === 'No value present'
                    ? 'Sorry, we could not find your account.'
                    : serverError.error}
                </p>
              </div>
            )
          )}
          {googleError && (
            <div className='getError_md_start'>
              <img src={errorIcon} alt='...' />
              <p>{googleError}</p>
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
            <button className='home_form_btn' onClick={onSubmit} disabled={isLoading}>
              {!isLoading ? 'Login' : <CircularProgress size={20} color='primary' />}
            </button>
            <div className='notMember_para'>
              <p>
                Not a registered member?{' '}
                <Link className='link' to='/signup'>
                  Sign up
                </Link>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
