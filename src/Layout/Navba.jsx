import axios from 'axios';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../Assets/Group 16429.png';
import bar from '../Assets/Group 4111.png';
import UserDropdown from '../Components/DropDown/UserDropDown';
import { useAuthContext } from '../Context/authContext';
import { getUserData } from '../Query/queryFunctions';
import { API_URL } from '../Utils/constants';
import MobileViewMenu from './MobileViewMenu';
import MobViewDashboardSidebar from './MobViewDashboardSidebar';
import './style.css';

const Navbar = () => {
 const history = useHistory();
 const { user, setUser } = useAuthContext();
 let location = useLocation();
 const userMutation = useMutation(getUserData, {
  onSuccess: (response) => {
   setUser({
    ...user,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    image: response.imageUrl,
    firstTime: response.firsTimeLogin,
    earlyBird: response.earlyBirds,
    customerNumber: response?.customerDetailsResponse?.customerNumber,
    registrationStatus: response?.registrationStatus,
   });
   // Here the noRedirect represents when the user logins from the journey flow we dont want them to be redirected
   const noRedirect = sessionStorage.getItem('noRedirect');
   if (
    response.registrationStatus !== 'VERIFIED' &&
    !noRedirect &&
    response?.emailVerified != true
   ) {
    history.push('/user-address');
   }
  },
 });

 //  const refreshTokenMutation = useMutation(refreshToken, {
 //   onSuccess: (response) => {
 //    if (response.status !== '401') {
 //     setUser({
 //      isAuthenticated: true,
 //      token: response?.accessToken,
 //      refreshToken: response?.refreshToken,
 //      expire: response?.expiresIn,
 //     });
 //    }
 //   },
 //  });

 const handleLogout = () => {
  //   if (user.accountType === 'facebook') {
  //    FacebookLoginClient.logout();
  //   }
  setUser({ isAuthenticated: false, token: null, data: {} });
 };

 useEffect(async () => {
  const query = new URLSearchParams(location.search);
  const IPV = query.get('IPV');

  if (location.pathname == '/continue') {
   if (!user.isAuthenticated) {
    history.push('/login');
   } else {
    const res = await axios.get(`${API_URL.DCR}/api/travel-bookings/${IPV}`, {
     headers: {
      Authorization: user.customerNumber,
      'Content-Type': 'application/json',
     },
    });

    localStorage.setItem('travelModel', JSON.stringify({ travel_mode: 'F' }));
    localStorage.setItem('OCH', JSON.stringify(res.data));
    history.push('/travel-claim?continue=true');
   }
  }
 });

 useEffect(() => {
  if (user?.isAuthenticated) {
   userMutation.mutate();
  }
  //  if (user.isAuthenticated) {
  //  refreshTokenMutation.mutate({ refreshToken: user?.refreshToken });
  //  const interval = setInterval(() => {
  //   refreshTokenMutation.mutate({ refreshToken: user?.refreshToken });
  //  }, 1000);
  //   }
 }, [user?.isAuthenticated]);

 return (
  <div className='nav_container'>
   <nav className='navbar navbar-expand-xl navbar-light custom_nav'>
    <div className='container-fluid'>
     <MobViewDashboardSidebar />
     <Link to='/'>
      <img className='web_logo' src={logo} alt='' />
     </Link>
     <button
      className='navbar-toggler deskTop_viewMenu'
      type='button'
      data-bs-toggle='collapse'
      data-bs-target='#navbarSupportedContent'
      aria-controls='navbarSupportedContent'
      aria-expanded='false'
      aria-label='Toggle navigation'
     >
      <img className='' src={bar} alt='' />
     </button>

     <MobileViewMenu />
     <div
      className='collapse navbar-collapse nav_ul'
      id='navbarSupportedContent'
     >
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
       <li className='nav-item'>
        <Link
         className={`nav-link ${location.pathname == '/' ? 'active' : ''}`}
         aria-current='page'
         to='/'
        >
         Home
        </Link>
       </li>
       <li className='nav-item'>
        <Link
         className={`nav-link ${
          location.pathname == '/service' ? 'active' : ''
         }`}
         to='/service'
        >
         Services
        </Link>
       </li>
       <li className='nav-item'>
        <Link
         className={`nav-link ${
          location.pathname == '/our-plan' ? 'active' : ''
         }`}
         to='/our-plan'
        >
         Pricing
        </Link>
       </li>
       <li className='nav-item'>
        <Link
         className={`nav-link ${location.pathname == '/blog' ? 'active' : ''}`}
         to='/blog'
        >
         Blogs
        </Link>
       </li>
       <li className='nav-item'>
        <Link
         className={`nav-link ${
          location.pathname == '/contact' ? 'active' : ''
         }`}
         to='/contact'
        >
         Contact
        </Link>
       </li>
      </ul>
      <ul className='navl_ultwo'>
       {!user?.isAuthenticated || (user?.isAuthenticated && user.firstTime) ? (
        <>
         <li className='nav-item'>
          <Link
           className={`nav-link ${
            location.pathname == '/account-info' ? 'active' : ''
           }`}
           to='/account-info'
          >
           My Account
          </Link>
         </li>
         <li className='nav-item'>
          <Link className='nav-link cus_blue_btn' to='/signup'>
           Sign up
          </Link>
         </li>
        </>
       ) : (
        <>
         <li className='nav-item'>
          <UserDropdown logout={handleLogout} />
         </li>
        </>
       )}
      </ul>
     </div>
    </div>
   </nav>
  </div>
 );
};

export default Navbar;
