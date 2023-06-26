import { useQuery } from 'react-query';
import { dashboard } from '../../Query/queryFunctions';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import sOpen from '../../Assets/Group 3398.png';
import sClose from '../../Assets/Group 3399.png';
import edit from '../../Assets/Icon awesome-editd.png';
import editLight from '../../Assets/Icon awesome-edit.png';
import hand from '../../Assets/Icon awesome-hand-point-up.png';
import handLight from '../../Assets/Icon awesome-hand-point-up2.png';
import lockLight from '../../Assets/Icon awesome-lock2.png';
import lock from '../../Assets/Icon awesome-lockd.png';
import searchLight from '../../Assets/Icon feather-search2.png';
import search from '../../Assets/Icon feather-searchd.png';
import time from '../../Assets/Icon ionic-ios-time.png';
import timeLight from '../../Assets/Icon ionic-ios-time2.png';
import dashboardIcon from '../../Assets/Icon material-dashboard.png';
import dashboardLight from '../../Assets/Icon material-dashboard2.png';
import person from '../../Assets/Icon material-person.png';
import more from '../../Assets/Path 5117.png';
import { useAuthContext } from '../../Context/authContext';
import './Style/sidebar.css';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
 root: {
  display: 'flex',
 },

 appBar: {
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),
 },
 appBarShift: {
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.enteringScreen,
  }),
 },
 menuButton: {
  marginRight: 36,
 },
 hide: {
  display: 'none',
 },
 drawer: {
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
 },
 drawerOpen: {
  width: drawerWidth,
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.enteringScreen,
  }),
 },
 drawerClose: {
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(7) + 1,
  [theme.breakpoints.up('sm')]: {
   width: theme.spacing(9) + 1,
  },
 },
 toolbar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
}));

export default function MiniDrawer() {
 const classes = useStyles();
 // const theme = useTheme();
 const [open, setOpen] = useState(false);

 const handleDrawerOpen = () => {
  setOpen(true);
 };

 const handleDrawerClose = () => {
  setOpen(false);
 };

 const [subLink, setSubLink] = useState(false);
 const openSubLinks = () => {
  setSubLink(!subLink);
 };
 const history = useHistory();
 const [path, setPath] = useState('');
 useEffect(() => {
  setPath(history.location.pathname);
 }, []);
 const { user } = useAuthContext();
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });

 return (
  <div className={classes.root}>
   <Drawer
    variant='permanent'
    className={clsx(classes.drawer, {
     [classes.drawerOpen]: open,
     [classes.drawerClose]: !open,
    })}
    classes={{
     paper: clsx({
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
     }),
    }}
    aria-labelledby='dropdownMenuButton10'
   >
    <List>
     <div
      onClick={handleDrawerClose}
      color='inherit'
      aria-label='close drawer'
      edge='start'
      className={`sClose_img ${clsx(classes.menuButton, {
       [classes.hide]: !open,
      })}`}
     >
      <h5>{Dashboard?.sidebar?.your_account}</h5>
      <img src={sClose} alt='...' />
     </div>
     <div className='sidebar_container'>
      <div>
       <div
        data-tip
        data-for='account_tt'
        className='sOpen_img'
        onClick={handleDrawerOpen}
       >
        <img
         src={sOpen}
         alt='...'
         color='inherit'
         aria-label='open drawer'
         edge='start'
         className={`sb_opnBtn ${clsx(classes.menuButton, {
          [classes.hide]: open,
         })}`}
        />
       </div>
       {!open && (
        <ReactTooltip id='account_tt' place='right' type='info' effect='solid'>
         {Dashboard?.sidebar?.your_account}
        </ReactTooltip>
       )}
      </div>
      <div className='sidebar_links'>
       <div>
        {open ? (
         <h5 className='sb_head'>{Dashboard?.sidebar?.dashboard}</h5>
        ) : null}
       </div>
      </div>
      <NavLink
       data-tip
       data-for='dashboard_tt'
       activeClassName='active_dash_link'
       style={{ marginTop: !open ? '15px' : '' }}
       to='/dashboard'
       className={!open ? 'sb_mob_link' : 'sb_link'}
      >
       <div data-tip='React-tooltip' className='sb_imgD'>
        <img
         src={path === '/dashboard' ? dashboardIcon : dashboardLight}
         alt='...'
        />
        {open ? <p>{Dashboard?.sidebar?.your_dashboard}</p> : null}
       </div>
       {open ? <img src={more} alt='...' /> : null}
      </NavLink>
      {!open && (
       <ReactTooltip id='dashboard_tt' place='right' type='info' effect='solid'>
        {Dashboard?.sidebar?.your_dashboard}
       </ReactTooltip>
      )}
      <div>{open ? <h5 className='sb_head'>Account</h5> : null}</div>
      <NavLink
       data-tip
       data-for='bookings_tt'
       activeClassName='active_dash_link'
       to='/travel-booking'
       className={!open ? 'sb_mob_link' : 'sb_link'}
      >
       <div className='sb_imgD'>
        <img
         src={path === '/travel-booking' ? searchLight : search}
         alt='...'
        />
        {open ? <p>{Dashboard?.sidebar?.your_travel}</p> : null}
       </div>
       {open ? <img src={more} alt='...' /> : null}
      </NavLink>
      {!open && (
       <ReactTooltip id='bookings_tt' place='right' type='info' effect='solid'>
        {Dashboard?.sidebar?.your_travel}
       </ReactTooltip>
      )}
      <div
       data-tip
       data-for='manage_tt'
       className={!open ? 'sb_mob_link' : 'sb_link'}
       onClick={openSubLinks}
      >
       <div className='sb_imgD'>
        <img src={person} alt='...' />
        {open ? <p>{Dashboard?.sidebar?.your_dashboard}</p> : null}
       </div>
       {open ? (
        <img
         className={subLink ? 'more_rotate' : 'less_rotate'}
         src={more}
         alt='...'
        />
       ) : null}
      </div>
      {!open && (
       <ReactTooltip id='manage_tt' place='right' type='info' effect='solid'>
        {Dashboard?.sidebar?.manage_account}
       </ReactTooltip>
      )}
      {subLink ? (
       <div className={open ? 'sub_sb_links' : ''}>
        <NavLink
         activeClassName='active_dash_link'
         to='/account-info'
         className={!open ? 'sb_mob_link' : 'sb_link'}
        >
         <div className='sb_imgD'>
          <img src={path === '/account-info' ? editLight : edit} alt='...' />
          {open ? <p>{Dashboard?.sidebar?.update_account}</p> : null}
         </div>
        </NavLink>
        <NavLink
         activeClassName='active_dash_link'
         to='/account-activity'
         className={!open ? 'sb_mob_link' : 'sb_link'}
        >
         <div className='sb_imgD'>
          <img
           src={path === '/account-activity' ? timeLight : time}
           alt='...'
          />
          {open ? <p>{Dashboard?.sidebar?.view_account}</p> : null}
         </div>
        </NavLink>
        {user.accountType === 'email' && (
         <NavLink
          activeClassName='active_dash_link'
          to='/security'
          className={!open ? 'sb_mob_link' : 'sb_link'}
         >
          <div className='sb_imgD'>
           <img src={path === '/security' ? lockLight : lock} alt='...' />
           {open ? <p>{Dashboard?.sidebar?.change_password} </p> : null}
          </div>
         </NavLink>
        )}
        <NavLink
         activeClassName='active_dash_link'
         to='/close-account'
         className={!open ? 'sb_mob_link' : 'sb_link'}
        >
         <div className='sb_imgD'>
          <svg
           className={path === '/close-account' ? 'trashcan' : 'trashcan_light'}
           xmlns='http://www.w3.org/2000/svg'
           viewBox='0 0 448 512'
           width={18}
          >
           <path
            fill='currentColor'
            d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'
           />
          </svg>
          {open ? <p>{Dashboard?.sidebar?.delete_account}</p> : null}
         </div>
        </NavLink>
        <NavLink
         activeClassName='active_dash_link'
         to='/manage-subscription'
         className={!open ? 'sb_mob_link' : 'sb_link'}
        >
         <div className='sb_imgD'>
          <img
           src={path === '/manage-subscription' ? handLight : hand}
           alt='...'
          />
          {open ? <p>{Dashboard?.sidebar?.manage_subscribtion} </p> : null}
         </div>
        </NavLink>
       </div>
      ) : null}
      {/* <NavLink
       activeClassName='active_dash_link'
       to='/notification'
       className={!open ? 'sb_mob_link' : 'sb_link'}
      >
       <div className='sb_imgD'>
        <img src={path === '/notification' ? bellLight : bell} alt='...' />
        {open ? <p>Notification</p> : null}
       </div>
       {open ? <img src={more} alt='...' /> : null}
      </NavLink> */}
     </div>
    </List>
   </Drawer>
  </div>
 );
}
