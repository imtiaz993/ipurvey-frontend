import { useQuery } from 'react-query';
import { useState } from 'react';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../Context/authContext';
import { dashboard } from '../Query/queryFunctions';
import '../Pages/DashboardAccount/Style/sidebar.css';
import sOpen from '../Assets/Group 3398.png';
import bell from '../Assets/Icon awesome-bell.png';
import edit from '../Assets/Icon awesome-editd.png';
import eye from '../Assets/Icon awesome-eye.png';
import hand from '../Assets/Icon awesome-hand-point-up.png';
import lock from '../Assets/Icon awesome-lock.png';
import search from '../Assets/Icon feather-searchd.png';
import time from '../Assets/Icon ionic-ios-time.png';
import dashboardIcon from '../Assets/Icon material-dashboard.png';
import person from '../Assets/Icon material-person.png';
import more from '../Assets/Path 5117.png';

const MobViewDashboardSidebar = () => {
 const { user } = useAuthContext();
 const [subLink, setSubLink] = useState(false);
 const openSubLinks = () => {
  setSubLink(!subLink);
 };

 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 return (
  <div className='mob_view_dashboard_sidebar_container'>
   <button
    className='dropdown-toggle db_sidebard_togle'
    type='button'
    id='dropdownMenuButton10'
    data-bs-toggle='dropdown'
    aria-expanded='false'
   >
    <img src={sOpen} alt='img' />
   </button>
   <div className='dropdown-menu ' aria-labelledby='dropdownMenuButton10'>
    <List>
     <div className='sidebar_container'>
      {user?.isAuthenticated && (
       <>
        <div className='sidebar_links'>
         <div>
          <h5 className='sb_head'>{Dashboard?.sidebar?.dashboard}</h5>
         </div>
        </div>
        <NavLink to='/dashboard' className='sb_link'>
         <div className='sb_imgD'>
          <img src={dashboardIcon} alt='...' />
          <p>{Dashboard?.sidebar?.your_dashboard}</p>
         </div>
         <img src={more} alt='...' />
        </NavLink>
       </>
      )}
      <div>
       {' '}
       <h5 className='sb_head'>Account</h5>{' '}
      </div>
      <NavLink to='/travel-booking' className='sb_link'>
       <div className='sb_imgD'>
        <img src={search} alt='...' />
        <p>{Dashboard?.sidebar?.your_travel}</p>
       </div>
       <img src={more} alt='...' />
      </NavLink>
      <div
       className='sb_link'
       onClick={(e) => {
        openSubLinks();
        e.stopPropagation();
       }}
      >
       <div className='sb_imgD'>
        <img src={person} alt='...' />
        <p>{Dashboard?.sidebar?.manage_account}</p>
       </div>
       <img
        className={subLink ? 'more_rotate' : 'less_rotate'}
        src={more}
        alt='...'
       />
      </div>
      {subLink ? (
       <div className='sub_sb_links'>
        <NavLink to='/account-info' className='sb_link'>
         <div className='sb_imgD'>
          <img src={eye} alt='...' />
          <p>{Dashboard?.view_acc_info}</p>
         </div>
        </NavLink>
        <NavLink to='/security' className='sb_link'>
         <div className='sb_imgD'>
          <img src={edit} alt='...' />
          <p>{Dashboard?.sidebar?.update_account}</p>
         </div>
        </NavLink>
        <NavLink to='/account-activity' className='sb_mob_link'>
         <div className='sb_imgD'>
          <img src={time} alt='...' />
          <p>{Dashboard?.sidebar?.view_account}</p>
         </div>
        </NavLink>
        <NavLink to='/security' className='sb_mob_link'>
         <div className='sb_imgD'>
          <img src={lock} alt='...' />
          <p>{Dashboard?.sidebar?.change_password}</p>
         </div>
        </NavLink>
        <NavLink to='/manage-subscription' className='sb_mob_link'>
         <div className='sb_imgD'>
          <img src={hand} alt='...' />
          <p>{Dashboard?.sidebar?.manage_subscribtion} </p>
         </div>
        </NavLink>
       </div>
      ) : null}
      <NavLink to='/notification' className='sb_link'>
       <div className='sb_imgD'>
        <img src={bell} alt='...' />
        <p>{Dashboard?.notification}</p>
       </div>
       <img src={more} alt='...' />
      </NavLink>
     </div>
    </List>
   </div>
  </div>
 );
};

export default MobViewDashboardSidebar;
