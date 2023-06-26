import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import video from '../../Assets/Animations/Airplanes.mp4';
import hover from '../../Assets/Component 41 – 1.png';
import train from '../../Assets/Group 3465.png';
import arrow from '../../Assets/Icon feather-arrow-rightw.png';
import plan from '../../Assets/Icon ionic-ios-airplane.png';
import errorIcon from '../../Assets/Icon material-error.png';

const StartedForm = ({ data }) => {
 const history = useHistory();

 const [travelMode, setTravelMode] = useState('');
 const [error, setError] = useState('');

 useEffect(() => {
  localStorage.setItem('travelModel', null);
 });

 const handleTravelMode = (event) => {
  setTravelMode(event);
 };

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (travelMode === '') {
   isValid = false;
   errors['travelMode'] = data?.form?.form_error;
  }

  setError(errors);

  return isValid;
 };

 const onSubmit = (e) => {
  if (validate()) {
   const data = {
    travel_mode: travelMode,
   };
   localStorage.setItem('travelModel', JSON.stringify(data));
   history.push('travel-claim');
  }
 };
 return (
  <div className='started_form_container'>
   <div className='started_form_md'>
    <div className='started_form'>
     <h1 id='started'>{data?.form?.get_started}</h1>
     <ReactPlayer
      width={'320px'}
      height={'180px'}
      playing={true}
      controls={false}
      loop={true}
      muted={true}
      url={video}
     />
     <h1>{data?.form?.how_travel}</h1>
     <div className='selection_travel_mode'>
      <div
       className={travelMode === 'F' ? 'byAir_mode activate' : 'byAir_mode'}
       onClick={() => {
        handleTravelMode('F');
        setError({});
       }}
      >
       <img className='planR' src={plan} alt='...' />
       <p>By Air</p>
      </div>

      <div className='hover_togle'>
       <div
        className={
         travelMode === 'R' ? 'byTrain_mode activate' : 'byTrain_mode'
        }
        data-tip
        data-for='rail_tt'
        //    onClick={() => {
        //     handleTravelMode('R');
        //     setError({});
        //    }}
       >
        <img src={train} alt='...' />
        <p>By Rail</p>
       </div>
      </div>
      <ReactTooltip id='rail_tt' place='bottom' type='info' effect='solid'>
       {data?.form?.rail_disabled}
      </ReactTooltip>
     </div>
     {error.travelMode && (
      <div className='getError_md'>
       <img src={errorIcon} alt='...' />
       <p>{error.travelMode}</p>
      </div>
     )}
     <div className='hover_togle_div'>
      <p>{data?.form?.help_text}</p>
      <div className='hover_togle'>
       <img src={hover} alt='...' />
       <div className='hover_i'>
        <h6>Flight:</h6>
        <p>{data?.form?.flight_help}</p>
        <div>
         <h6>Rail:</h6>
         <p>{data?.form?.rail_help}</p>
        </div>
       </div>
      </div>
     </div>
     <button className='home_form_btn' onClick={onSubmit}>
      {data?.form?.submit_text} <img src={arrow} alt='...' />{' '}
     </button>
    </div>
   </div>
  </div>
 );
};

export default StartedForm;
