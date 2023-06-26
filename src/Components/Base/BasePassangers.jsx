import { useEffect, useRef, useState } from 'react';
import selected from '../../Assets/selected-t.png';
import unselected from '../../Assets/unselected-t.png';
import { useAuthContext } from '../../Context/authContext';
import errorIcon from '../../Assets/Icon material-error.png';
import { Grid } from '@material-ui/core';

export default function BasePassangers({ refresh, proceed, setPaymentObjF }) {
 const [type, setType] = useState(null);
 const [passanger, setPassanger] = useState(null);
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const [duplicateError, setDuplicateError] = useState(null);
 const btnRef = useRef();
 const fromRef = useRef();
 const { user } = useAuthContext();

 useEffect(() => {
  setUnderscoreRefresh(refresh);
 }, []);

 useEffect(() => {
  let { passengerType, passengers } = JSON.parse(
   localStorage.getItem('travelModel')
  );
  if (passengerType) {
   setType(passengerType);
  } else {
   setType('alone');
  }
  if (passengers) {
   setPassanger(passengers);
   if (passengers && user.isAuthenticated) {
    const { firstName, lastName } = user;
    passengers?.forEach((p) => {
     if (
      transformText(p[0]) === transformText(firstName) &&
      transformText(p[1]) === transformText(lastName)
     ) {
      setDuplicateError(
       'Passenger names including lead passenger (registered iPurvey customer) can’t be the same'
      );
      return;
     }
     setDuplicateError(null);
    });
   }
  } else {
   setPassanger([['', '']]);
  }
 }, []);

 useEffect(() => {
  if (passanger !== null) {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.passengers = passanger;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [passanger]);
 useEffect(() => {
  if (type !== null) {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.passengerType = type;
   if (type == 'alone') {
    setPassanger([['', '']]);
   }
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [type]);

 const transformText = (text) => {
  if (text) {
   return text.trim().toLowerCase();
  }
 };

 const isDuplicate = (passanger) => {
  let error = false;
  const dummyPassengers = [];
  passanger.forEach((passenger) => {
   if (dummyPassengers.length > 0) {
    if (!dummyPassengers.includes(passenger[0] + ' ' + passenger[1])) {
     dummyPassengers.push(passenger[0] + ' ' + passenger[1]);
    } else {
     error = true;
    }
   }
  });
  return error;
 };

 const checkDuplicateExistOnAddPassengerClick = () => {
  let isError = false;

  if (user.isAuthenticated) {
   if (isPassengerLoggedinUser(user, passanger)) {
    setDuplicateError(
     'Passenger names including lead passenger (registered iPurvey customer) can’t be the same'
    );
    return;
   }
   if (isDuplicate(passanger)) {
    isError = true;
    setDuplicateError('Name has been already entered');
   }
  } else {
   if (isDuplicate(passanger)) {
    isError = true;
    setDuplicateError('Name has been already entered');
   }
  }
  if (!isError) {
   addPassengerHandler();
  }
 };

 useEffect(() => {
  if (refresh > _refresh) {
   if (type == 'company') {
    btnRef.current.click();
   } else {
    setPaymentObjF({ passanger: [] });
    proceed();
   }
  }
 }, [refresh]);

 const isEmptyExistinPassengers = (passengers) => {
  const isEmptyExist = passengers.find((el) => !el[0] || !el[1]);
  if (isEmptyExist) {
   fromRef?.current?.classList.add('was-validated');
  } else {
   fromRef?.current?.classList.remove('was-validated');
  }
  return isEmptyExist;
 };

 const addPassengerHandler = () => {
  if (!duplicateError && !isEmptyExistinPassengers(passanger)) {
   setPassanger([...passanger, ['', '']]);
  }
 };

 const isPassengerLoggedinUser = (user, passanger) => {
  const { firstName, lastName } = user;
  return passanger?.find((p) => {
   return (
    transformText(p[0]) === transformText(firstName) &&
    transformText(p[1]) === transformText(lastName)
   );
  });
 };

 const isduplicatePassenger = (i, passanger) => {
  return passanger?.find((p, index) => {
   if (p[0] && p[1] && passanger[i][0] && passanger[i][1]) {
    if (i !== index) {
     const firstName = transformText(p[0]);
     const lastName = transformText(p[1]);
     return (
      transformText(passanger[i][0]) === firstName &&
      transformText(passanger[i][1]) === lastName
     );
    }
   }
  });
 };

 const checkDuplicateExist = (i, passanger) => {
  if (user?.isAuthenticated) {
   if (isPassengerLoggedinUser(user, passanger)) {
    setDuplicateError(
     'Passenger names including lead passenger (registered iPurvey customer) can’t be the same'
    );
    return;
   }
   if (isduplicatePassenger(i, passanger)) {
    setDuplicateError('Name has been already entered');
    return;
   }
   setDuplicateError(null);
  } else if (!user.isAuthenticated) {
   if (isduplicatePassenger(i, passanger)) {
    setDuplicateError('Name has been already entered');
    return;
   }
   setDuplicateError(null);
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (e.target.checkValidity() && !duplicateError) {
   setPaymentObjF({ passanger });
   if (!user?.isAuthenticated) {
    localStorage.setItem('additionalPassengers', JSON.stringify(passanger));
   }
   proceed();
  } else {
   e.target.classList.add('was-validated');
  }
 };
 return (
  <form
   onSubmit={handleSubmit}
   className='flex-column ml-3 needs-validation'
   noValidate
   ref={fromRef}
  >
   <div className='add-pass'>
    <h1 className='heading'>Do you want to add more passengers?</h1>
    <div className='row-evenly'>
     <div
      className={type == 'alone' ? 'base-wh-btn activate' : 'base-wh-btn'}
      onClick={() => {
       setType('alone');
      }}
     >
      <img src={type == 'alone' ? selected : unselected} alt='...' />
      <p>No, I was traveling alone</p>
     </div>
     <div
      className={type == 'company' ? 'base-wh-btn activate' : 'base-wh-btn'}
      onClick={() => {
       setType('company');
      }}
     >
      <img src={type == 'company' ? selected : unselected} alt='...' />
      <p>Yes, I had a company</p>
     </div>
    </div>
   </div>
   {type == 'company' && (
    <div className='add-detail'>
     <h1 className='heading'>Additional passengers details</h1>
     {passanger?.map((person, i) => {
      return (
       <>
        <p key={i} className='medium mt-4'>
         Passenger {i + 1}
        </p>
        <Grid container spacing={1}>
         <Grid item xs={passanger.length !== 1 ? 5 : 6}>
          <div className='stp_inp  form-check'>
           <input
            id='white-center-icon'
            className='form-control'
            placeholder='First Name'
            required
            value={person[0]}
            onChange={(e) => {
             const _passengers = [...passanger];
             _passengers[i] = [e.target.value, person[1]];
             fromRef?.current?.classList?.remove('was-validated"');
             checkDuplicateExist(i, _passengers);
             setPassanger(_passengers);
            }}
           />
           <div className='invalid-feedback'>Should not be empty</div>
          </div>
         </Grid>
         <Grid item xs={passanger.length !== 1 ? 5 : 6}>
          <div className='stp_inp form-check'>
           <input
            id='white-center-icon'
            className='form-control'
            placeholder='Last Name'
            required
            value={person[1]}
            onChange={(e) => {
             const _passengers = [...passanger];
             _passengers[i] = [person[0], e.target.value];
             fromRef?.current?.classList?.remove('was-validated"');
             checkDuplicateExist(i, _passengers);
             setPassanger(_passengers);
            }}
           />
           <div className='invalid-feedback'>Should not be empty</div>
          </div>
         </Grid>
         <Grid item xs={passanger.length !== 1 ? 2 : 0}>
          {passanger.length !== 1 && (
           <button
            className='ml-2 d-flex w-100 align-items-center text-danger justify-content-center p-0 rounded border border-danger btn'
            style={{ height: 35 }}
            type='button'
            onClick={() => {
             setDuplicateError(null);
             let _passengers = [...passanger];
             _passengers = _passengers?.filter((item) => item !== person);
             setPassanger(_passengers);
            }}
           >
            Remove
           </button>
          )}
         </Grid>
        </Grid>
       </>
      );
     })}
     {duplicateError ? (
      <div className='getError_md_start' id='center-err'>
       <img src={errorIcon} alt='...' />
       <p>{duplicateError}</p>
      </div>
     ) : null}
     {passanger.length != 8 && (
      <div className='pass-btn'>
       <button
        type='button'
        className='home_form_btn medium'
        onClick={checkDuplicateExistOnAddPassengerClick}
       >
        Add a passenger
       </button>
      </div>
     )}
     <button className='hide' type='submit' ref={btnRef} />
    </div>
   )}
  </form>
 );
}
