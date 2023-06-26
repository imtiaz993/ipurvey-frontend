import { API_URL } from '../../Utils/constants';

const WhyIpurvey = ({ data }) => {
 return (
  <div className='why_ipur_container'>
   <div className='why_ipur_md'>
    <div className='why_ipur_sd'>
     <h4>{data?.why_ipurvey_section?.title}</h4>
     <div className='why_para_describe'>
      <p>{data?.why_ipurvey_section?.description}</p>
     </div>
     <div className='why_ipurvey_steps'>
      {data?.why_ipurvey_section?.card.map((card, i) => {
       return (
        <div key={i}>
         <img src={`${API_URL.CMS}${card?.image?.url}`} alt='...' />
         <h6>{card.title}</h6>
         <p>{card.description}</p>
        </div>
       );
      })}
     </div>
    </div>
   </div>
  </div>
 );
};
export default WhyIpurvey;
