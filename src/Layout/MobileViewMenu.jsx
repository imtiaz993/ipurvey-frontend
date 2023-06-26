import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import bar from '../Assets/Group 4111.png';
import { useAuthContext } from '../Context/authContext';

const MobileViewMenu = () => {
 const { user, setUser } = useAuthContext();

 const firstName =
  user?.firstName !== null && user?.firstName !== undefined
   ? user?.firstName
   : '';
 const lastName =
  user?.lastName !== null && user?.lastName !== undefined ? user?.lastName : '';
 const name = firstName.concat(' ', lastName);

 const handleLogout = () => {
  setUser({ isAuthenticated: false, token: null, data: {} });
 };
 return (
  <div className='mobView_menu_bar'>
   <button
    className='navbar-toggler'
    type='button'
    // data-bs-toggle="collapse"
    // data-bs-target="#navbarSupportedContentMobile"
    // aria-controls="navbarSupportedContent"
    // aria-expanded="false"
    // aria-label="Toggle navigation"
    id='dropdownMenuButtonMenu2'
    data-bs-toggle='dropdown'
    aria-expanded='false'
   >
    <img className='' src={bar} alt='' />
   </button>
   <div
    className='dropdown-menu '
    aria-labelledby='dropdownMenuButtonMenu2'
    id='navbarSupportedContentMobile'
    // onClick={(e) => e.stopPropagation()}
   >
    {!user?.isAuthenticated ? (
     <div className='mobVIewLinks_md'>
      <div className='mobView_link'>
       <Link className='link' to='/'>
        Home
       </Link>
       <Link className='link ' to='/terms'>
        Services
       </Link>
       <Link className='link' to='/our-plan'>
        Pricing
       </Link>
       <Link className='link' to='/partners'>
        Partners
       </Link>
       <Link className='link' to='/career'>
        Careers
       </Link>
       <Link className='link' to='/blog'>
        Blogs
       </Link>
       <Link className='link' to='/contact'>
        Contact
       </Link>
      </div>
     </div>
    ) : (
     <div className='mobVIewLinks_md'>
      <div className='nav_userInfo'>
       <div className='nav_nameEmail'>
        <p className='navUsername'>{name}</p>
        <p className='navUserEmail'>{user?.email}</p>
        {/* <p className='navUserField'>Frequent Rail Commuter Plan</p> */}
       </div>
       <Avatar
        color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
        size='50'
        round='10px'
        textSizeRatio={1.75}
        name={firstName}
       />
       {/* <img
        src={user?.image !== null ? user?.Image : userprofileimg}
        alt='...'
       /> */}
      </div>
      <div className='mobView_link'>
       <Link className='link' to='/'>
        Home
       </Link>
       <Link className='link ' to='/terms'>
        Services
       </Link>
       <Link className='link' to='/our-plan'>
        Pricing
       </Link>
       <Link className='link' to='/partners'>
        Partners
       </Link>
       <Link className='link' to='/career'>
        Careers
       </Link>
       <Link className='link' to='/blog'>
        Blogs
       </Link>
       <Link className='link' to='/contact'>
        Contact
       </Link>
      </div>
      <div className='mobView_link_two'>
       <Link className='link' to='/dashboard'>
        Dashboard
       </Link>
       <Link className='link' to='/travel-booking'>
        Your Travel Bookings
       </Link>
       <Link className='link' to='/security'>
        Manage Account
       </Link>
       <Link className='link ' to='/notification'>
        Notification
       </Link>
       <button onClick={handleLogout}>Logout</button>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export default MobileViewMenu;
