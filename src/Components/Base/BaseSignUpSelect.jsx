import { useEffect, useState } from 'react';
import house from '../../Assets/house-blue.png';
import FacebookLogin from '@greatsumini/react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useAuthContext } from '../../Context/authContext';
import http from '../../Service/http';
import { API_URL } from '../../Utils/constants';
import fb from '../../Assets/Group 833.png';
import g from '../../Assets/google-with-cuts.png';
import OR from '../../Assets/OR.png';
import errorIcon from '../../Assets/Icon material-error.png';

const BaseSignUpSelect = ({ proceed, disabled }) => {
 const { user, setUser } = useAuthContext();
 const [googleError, setGoogleError] = useState('');
 const [userMail, setMail] = useState('');
 useEffect(() => {
  disabled(true);
  const TravelModel = JSON.parse(localStorage.getItem('travelModel'));
  setMail(TravelModel['email']);
 }, []);
 const finalize = () => {
  setGoogleError('');
  localStorage.setItem('noRedirect', true);
  proceed();
  proceed();
  proceed();
  disabled(false);
 };
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
    finalize();
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
    finalize();
   }
  } catch (error) {
   console.log(error.message);
  }
 };
 const FacebookBtn = ({ onClick }) => (
  <button className='acc_blue_btn' id='w-500' onClick={onClick}>
   <img src={fb} alt='fb' />
   Sign up using Facebook
  </button>
 );
 return (
  <div className='base-singup-container'>
   <img src={house} alt='house' className='mb-2' />
   <h3 id='h3'>Let's get you on board!</h3>
   <p id='grey-para'>Let's get to know each other and secure your account!</p>
   <div className='account_form_sd'>
    <FacebookLogin
     appId='136670628516723'
     fields='name,email,picture'
     onSuccess={(response) => loginUsingFacebookAuth(response.accessToken)}
     render={({ onClick }) => <FacebookBtn onClick={onClick} />}
    />
    <GoogleLogin
     icon={false}
     className='acc_wht_btn base_googleLogin_btn'
     clientId='830826723708-eb5ocfrg6fc67u51ta2cbbgpuvamhskv.apps.googleusercontent.com'
     onSuccess={(response) => loginUsingGoogleAuth(response.accessToken)}
     onFailure={(error) => console.log(error)}
    >
     <img src={g} alt='fb' className='mr-3-5' />
     <span>Sign up using Google</span>
    </GoogleLogin>
    <div className='the-ques-div mt-4'>
     <img src={OR} />
     <button
      className='acc_wht_btn email_btn'
      id='w-500'
      onClick={() => {
       proceed();
       disabled(false);
      }}
     >
      Sign up with
      <span className='the-mail-thingy ml-1'>"{userMail}"</span>
     </button>
     {googleError && (
      <div className='getError_md_start'>
       <img src={errorIcon} alt='...' />
       <p>{googleError}</p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default BaseSignUpSelect;
