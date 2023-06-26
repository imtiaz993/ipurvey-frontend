import { API_URL } from '../../Utils/constants';

const OurTeam = ({ data }) => {
 return (
  <div className='ourTeam_container'>
   <div className='ourTeam_md'>
    <div className='ourTeam_sd'>
     <div className='ourTeam_left_content'>
      <img src={`${API_URL.CMS}${data?.team?.image[0]?.url}`} alt='' />
     </div>
     <div className='ourTeam_right_md'>
      <h4>{data?.team?.title}</h4>
      <p className='be_part_para'>{data?.team?.description}</p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default OurTeam;
