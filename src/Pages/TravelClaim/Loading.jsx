import stepLoad from '../../Assets/stepLoad.png';
const Loading = () => {
 return (
  <div className='steper_form_container'>
   <div className='stepper_form_md'>
    <div className='stepper_form'>
     <div className='loading_stpr_div'>
      <p className='loading_border'></p>
      <img className='loading_steper' src={stepLoad} alt='...' />
     </div>
     <h2>Just a moment please!</h2>
     <p className='load_para'>
      Please wait while we retrieve the journey details!
     </p>
    </div>
   </div>
  </div>
 );
};

export default Loading;
