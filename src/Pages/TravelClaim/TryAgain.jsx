import headImg from '../../Assets/undraw_feeling_blue_4b7q (2).png';
import ReactMarkdown from 'react-markdown';

const TryAgain = ({ data, travelMode }) => {
 return (
  <div className='stepper_form' id='far-back'>
   <img className='far-back-image' src={headImg} alt='...' />
   <div className='flex-con'>
    <h2 className='errrr' id='far-back-h'>
     {data?.form?.invalid_date}
    </h2>
    <ReactMarkdown className='stp_para'>
     {travelMode === 'F'
      ? data?.form?.flight_invalid_date_description
      : data?.form?.rail_invalid_date_description}
    </ReactMarkdown>
   </div>
  </div>
 );
};

export default TryAgain;
