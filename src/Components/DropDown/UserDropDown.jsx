import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import hand from '../../Assets/Icon awesome-hand-point-up2.png';
import dashboard from '../../Assets/Icon material-dashboard.png';
import person from '../../Assets/Icon material-person2.png';
import out from '../../Assets/Icon open-account-logout.png';
import downicon from '../../Assets/Path 5113.png';
import { useAuthContext } from '../../Context/authContext';
import { useEffect } from 'react';

const UserDropdown = ({ logout }) => {
 const { user } = useAuthContext();
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');

 useEffect(() => {
  if (user.firstName) setFirstName(user.firstName);
  if (user.lastName) setLastName(user.lastName);
 }, [user]);

 return (
  <>
   <div className='dropdown userinfo_dropdown'>
    <div className='userinfo_text'>
     <h2>{firstName.concat(' ', lastName)}</h2>
     <span className=''>{user?.email}</span>
     {/* <span className='grey'>Frequent Rail Commuter Plan</span> */}
    </div>
    <button
     className='btn userdrpdwn_btn dropdown-toggle d-flex'
     type='button'
     id='dropdownMenuButton1'
     data-bs-toggle='dropdown'
     aria-expanded='false'
    >
     <Avatar
      color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
      size='50'
      round='10px'
      textSizeRatio={1.75}
      name={firstName}
     />
     {/* <img
      className='usericon'
      src={user?.image !== null ? user?.Image : userprofileimg}
      alt='img'
     /> */}
     <img className='downicon' src={downicon} alt='img' />
    </button>
    <div
     className='dropdown-menu userdrpdwn_menu'
     aria-labelledby='dropdownMenuButton1'
    >
     <Link to='/dashboard' className='drop_link'>
      <img src={dashboard} alt='...' />
      <p>Your Dashboard</p>
     </Link>
     <Link to='/account-info' className='drop_link'>
      <img src={person} alt='...' />
      <p>Account Settings</p>
     </Link>
     <Link to='/manage-subscription' className='drop_link'>
      <img src={hand} alt='...' />
      <p>Subscriptions</p>
     </Link>
     <Link to='/logout' className='drop_link' onClick={logout}>
      <img src={out} alt='...' />
      <p>Logout</p>
     </Link>
    </div>
   </div>
  </>
 );
};

export default UserDropdown;
