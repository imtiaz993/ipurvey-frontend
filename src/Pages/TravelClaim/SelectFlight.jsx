import { useState } from 'react';
import plan from '../../Assets/Icon ionic-ios-airplane.png';

const SelectFlight = ({ data }) => {
 const [flightSected, setFlightSelected] = useState();
 const handleFlightSelect = (event) => {
  setFlightSelected(event);
 };
 return (
  <div className='base-form-container'>
   <div className='stepper_form_md'>
    <div className='stepper_form'>
     <h2>{data?.form?.select_flight}</h2>
     <ul className='flights_list'>
      {[0, 1, 2, 3, 4].map((i) => (
       <li
        className={
         flightSected === i ? 'flight_li flight_selected' : 'flight_li'
        }
        key={i}
        onClick={() => handleFlightSelect(i)}
       >
        <input
         type='checkbox'
         checked={flightSected === i}
         readOnly
         name='flight'
         id='flight'
        />
        {/* <div className='flight_time'>
         19:00 <img src={plan} alt='...' />
         23:00
        </div>
        <p className='flight_landed'>Qatar Airways</p>
        <p className='flight_code'>QA4159</p> */}
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default SelectFlight;
