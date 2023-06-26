import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import tick from '../../Assets/Path 6521.png';
import BankDetails from '../../Components/Forms/BankDetails';
import UserAddressForm from '../../Components/Forms/UserAddressForm';
import UserAddressForm2 from '../../Components/Forms/UserAddressForm2';
import { useAuthContext } from '../../Context/authContext';
import { getUserData } from '../../Query/queryFunctions';

const nextStepForm = (data, nextFunc, backFunc, steps) => {
 switch (steps) {
  case 0:
   return <UserAddressForm nextBtn={nextFunc} />;
  case 1:
   return <UserAddressForm2 nextBtn={nextFunc} backBtn={backFunc} />;
  case 2:
   return <BankDetails nextBtn={nextFunc} backBtn={backFunc} />;
  default:
   break;
 }
};

const Stepper = ({ data }) => {
 const history = useHistory();
 const { user, setUser } = useAuthContext();
 let [nextStep, setNextStep] = useState(0);

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
   onRedirect('/dashboard');
  },
 });

 useEffect(() => {
  if (!user?.isAuthenticated) {
   history.push('/');
  }
 }, [user?.isAuthenticated]);

 const onRedirect = (redirect) => history.push(redirect);
 const handleNextButton = () => {
  setNextStep(++nextStep);
  if (nextStep === 3) userMutation.mutate();
 };
 const handleBackButton = () => {
  setNextStep(--nextStep);
  localStorage.removeItem('addressDetail');
 };
 return (
  <div className='claim_stepper_container'>
   <div className='claimStepper_md'>
    <div className='claim_stepper_main'>
     <div className='claimSteps_head'>
      <div className='firstStep_md'>
       <div className='step_name'>
        <p
         className='step_dot clr_dot'
         style={nextStep >= 2 ? { background: '#50c900' } : { background: '' }}
        >
         {nextStep >= 2 ? <img src={tick} alt='...' /> : null}{' '}
        </p>
        <div className='steps_line'>
         <p className='single_step_line'></p>
         <p
          className={`single_filed_line ${
           nextStep === 0
            ? 'w_i_50_p'
            : nextStep === 1
            ? 'w_i_70_p'
            : 'w_i_100_p greenBg'
          }`}
         ></p>
        </div>
       </div>
      </div>
      <div className='firstStep_md'>
       <div className='step_name'>
        {nextStep >= 2 ? (
         <p
          className='step_dot clr_dot'
          style={nextStep >= 3 ? { background: '#50c900' } : { background: '' }}
         >
          {nextStep >= 3 ? <img src={tick} alt='...' /> : null}{' '}
         </p>
        ) : (
         <p className='step_dot'></p>
        )}
       </div>
      </div>
     </div>
     {/* stepper body  */}
     <div className='stepper_body'>
      {nextStepForm(data, handleNextButton, handleBackButton, nextStep)}
     </div>
    </div>
   </div>
  </div>
 );
};

export default Stepper;
