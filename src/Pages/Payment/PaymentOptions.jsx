import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../../Context/authContext';
import { getUserData, home } from '../../Query/queryFunctions';
import { API_URL } from '../../Utils/constants';
import tick from '../../Assets/Group 872.png';

const PaymentOptions = ({
 data,
 theData,
 refresh,
 proceed,
 disabled,
 setPaymentObjF,
}) => {
 const [activeOption1, setActiveOption1] = useState('');
 const [activeOption2, setActiveOption2] = useState('');
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const { user, setUser } = useAuthContext();

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

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
   const travelModel = JSON.parse(localStorage.getItem('travelModel'));
   const _passengers = [];
   _passengers.push({
    firstName: user.firstName,
    lastName: user.lastName,
   });

   data.passanger.forEach((person) => {
    _passengers.push({
     firstName: person[0],
     lastName: person[1],
    });
   });

   axios.put(
    `${API_URL.DCR}/api/passenger-details/${theData.instructionIdentification}`,
    {
     additionalPassengers: _passengers,
     bookingEmailAddress: travelModel.email,
     bookingReference: travelModel.refNo,
     termsOfService: 'true',
    },
    {
     headers: {
      Authorization: response?.customerDetailsResponse?.customerNumber,
      'Content-Type': 'application/json',
     },
    }
   );
  },
 });

 useEffect(() => {
  if (!activeOption1 && !activeOption2) {
   disabled(true);
  } else {
   disabled(false);
  }
 }, [activeOption1, activeOption2]);

 useEffect(() => {
  userMutation.mutate();
  setUnderscoreRefresh(refresh);
 }, []);

 useEffect(() => {
  if (activeOption1 !== '' && activeOption2 !== '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.payment_option = activeOption1 == true ? 1 : 2;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [activeOption1, activeOption2]);

 useEffect(() => {
  if (activeOption1 == '' && activeOption2 == '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   setActiveOption1(
    travelModel.payment_option ? travelModel.payment_option == 1 : false
   );
   setActiveOption2(
    travelModel.payment_option ? travelModel.payment_option == 2 : true
   );
  }
 }, []);

 useEffect(() => {
  if (refresh > _refresh) {
   validate();
  }
 }, [refresh]);

 const validate = () => {
  const travelModel = JSON.parse(localStorage.getItem('travelModel'));
  setPaymentObjF({ ...data, selectedSubscription: activeOption1, travelModel });
  proceed();
 };

 return (
  <div>
   <div className='row mt-5'>
    <div className='col-lg-12'>
     <div className='pay_option_text ml-4 mb-2'>
      <h1 className='ft-14 medium'>{data?.Payment?.payment_option}</h1>
     </div>
    </div>
   </div>
   <div className='plan-payment-option'>
    <div className='row'>
     <div className='col-lg-12'>
      <div
       className={!activeOption1 ? 'pay_option_1 ' : 'pay_option_1 active_box'}
       onClick={() => {
        setActiveOption1(!activeOption1);
        setActiveOption2(false);
       }}
      >
       {activeOption1 ? (
        <div>
         <img src={tick} className='option-tick' alt='...' />
        </div>
       ) : (
        ''
       )}
       <h5 className='black mb-2'>{Home?.Payment?.subscribe_text}</h5>
       <p>{Home?.Payment?.claim_text}</p>
       <h6>{Home?.Payment?.starting_from}</h6>
       <strong className='bigg'>{Home?.Payment?.plan1_price}</strong>
       <span>{Home?.Payment?.plan1_detail}</span>
      </div>
     </div>

     <div className='col-lg-12'>
      <div
       className={!activeOption2 ? 'pay_option_2' : 'pay_option_2 active_box'}
       onClick={() => {
        setActiveOption2(!activeOption2);
        setActiveOption1(false);
       }}
      >
       {activeOption2 ? (
        <div>
         <img src={tick} className='option-tick' alt='...' />
        </div>
       ) : (
        ''
       )}
       <h5 className='black mb-2 widthhh'>{Home?.Payment?.plan2_detail}</h5>
       <strong className='bigg'>{Home?.Payment?.plan2_price}</strong>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PaymentOptions;
