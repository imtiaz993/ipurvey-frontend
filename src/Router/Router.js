import {
 BrowserRouter as Router,
 Redirect,
 Route,
 Switch,
} from 'react-router-dom';
import Base from '../Components/Base/Base';
import FeedBack from '../Components/Feedback/FeedBack';
import Navbar from '../Layout/Navba';
import About from '../Pages/About/About';
import Blog from '../Pages/Blogs/Blog';
import SelectBlog from '../Pages/Blogs/OneBlogPage';
import Career from '../Pages/Career';
import Contact from '../Pages/Contact/Contact';
import Forgot from '../Pages/CreateAccount/Forgot';
import Login from '../Pages/CreateAccount/Login';
import ResetPassword from '../Pages/CreateAccount/ResetPassword';
import SignUp from '../Pages/CreateAccount/SignUp';
import UserAddress from '../Pages/CreateAccount/UserAddress';
import VerificationSuccess from '../Pages/CreateAccount/VerificationSuccess';
import VerifyEmail from '../Pages/CreateAccount/VerifyEmail';
import Faq from '../Pages/FAQ/Faq';
import Home from '../Pages/Home/Home';
import Logout from '../Pages/Logout/Logout';
import OurPlans from '../Pages/OurPlans/OurPlans';
import Plan from '../Pages/Plan/Plan';
import Privacy from '../Pages/Privacy/Privacy';
import Service from '../Pages/Service/Service';
import TermAndCond from '../Pages/Terms/Terms';
import PrivateRoute from './PrivateRoute';
import AccountActivity from '../Pages/DashboardAccount/AccountActivity';
import AccountInformation from '../Pages/DashboardAccount/AccountInfo';
import DashBoard from '../Pages/DashboardAccount/Dashboard';
import DeleteAccount from '../Pages/DashboardAccount/DeleteAccount';
import SecuritySetting from '../Pages/DashboardAccount/SecuritySetting';
import TravelBooking from '../Pages/DashboardAccount/TravelBooking';
import SubscriptionManager from '../Pages/DashboardAccount/Subcription';

const AppRouter = () => {
 return (
  <Router>
   <Navbar />
   <FeedBack />
   <Switch>
    <PrivateRoute path='/dashboard' component={DashBoard} />
    <PrivateRoute path='/account-info' component={AccountInformation} />
    <PrivateRoute path='/travel-booking' component={TravelBooking} />
    <PrivateRoute path='/security' component={SecuritySetting} />
    <PrivateRoute path='/close-account' component={DeleteAccount} />
    <PrivateRoute exact path='/account-activity' component={AccountActivity} />
    <PrivateRoute
     path='/manage-subscription'
     component={SubscriptionManager}
    />{' '}
    <Route exact path='/' component={Home} />
    <Route path='/terms' component={TermAndCond} />
    <Route path='/privacy' component={Privacy} />
    <Route path='/about' component={About} />
    <Route path='/faq' component={Faq} />
    <Route path='/career' component={Career} />
    <Route path='/plan' component={Plan} />
    <Route path='/logout' component={Logout} />
    <Route path='/travel-claim' component={Base} />
    <Route path='/verify-email' component={VerifyEmail} />
    <Route path='/registrationConfirm' component={VerificationSuccess} />
    <Route path='/user-address' component={UserAddress} />
    <Route path='/service' component={Service} />
    <Route path='/our-plan' component={OurPlans} />
    <Route exact path='/blog' component={Blog} />
    <Route path='/blog/:id' component={SelectBlog} />
    <Route path='/contact' component={Contact} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={SignUp} />
    <Route path='/forgot' component={Forgot} />
    <Route path='/auth/reset' component={ResetPassword} />
    <Redirect to='/' />
   </Switch>
  </Router>
 );
};

export default AppRouter;
