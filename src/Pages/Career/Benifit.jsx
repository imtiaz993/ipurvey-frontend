import { API_URL } from '../../Utils/constants';

const Benifit = ({ data }) => (
 <div className='benifit_container'>
  <div>
   <div className='benifit_md'>
    <h4>{data?.Benifits?.title}</h4>
    <div className='benifit_cards'>
     {data?.Benifits?.Benefit?.map((item, index) => (
      <div key={index}>
       <img src={`${API_URL.CMS}${item?.image?.url}`} alt='' />
       <h6>{item?.title}</h6>
       <p>{item?.description}</p>
      </div>
     ))}
    </div>
   </div>
  </div>
 </div>
);

export default Benifit;
