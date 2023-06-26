import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useHistory, useLocation } from 'react-router-dom';
import helpIcon from '../../Assets/help-icon.png';
import Loader from '../../Components/Loader';
import { home } from '../../Query/queryFunctions';
import './Base.css';
import Forms from './Forms';
import Stepper from './Stepper';

export default function Base() {
 const location = useLocation();
 const history = useHistory();
 const [success, setSuccess] = useState(1);
 const query = new URLSearchParams(location.search);
 const verifyQ = query.get('verify');
 const paymentQ = query.get('payment');
 const continueJourney = query.get('continue');

 const { data } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 useEffect(() => {
  if (!JSON.parse(localStorage.getItem('travelModel'))) {
   history.push('/');
  }
 }, []);

 return (
  <div className='base-container'>
   <Stepper success={success} />
   <div className='flex-row r-end'>
    <Link to='/contact'>
     <img className='help-icon' src={helpIcon} />
     <span className='semibold'>Need help?</span>
    </Link>
   </div>
   {data ? (
    <Forms
     data={data}
     verifyed={verifyQ}
     payment={paymentQ}
     continueJourney={continueJourney}
     success={setSuccess}
    />
   ) : (
    <Loader />
   )}

   <div className='base-background' />
  </div>
 );
}
