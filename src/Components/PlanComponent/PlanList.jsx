import { CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
import tick from '../../Assets/Path 5451.svg';
import { plans } from '../../Query/queryFunctions';

const PlanList = ({ product }) => {
 const { data } = useQuery('plans', plans, {
  refetchOnWindowFocus: false,
 });

 if (data) {
  return (
   <>
    {data
     .find((plan) => plan.id === product.strapiId)
     .features.map((feature, index) => (
      <div key={index} className='col-lg-12 mb-2 p-0'>
       <ul className='plan_list'>
        <li>
         <img src={tick} alt='...' />
         <div>
          <span>{feature.title}</span>
         </div>
        </li>
       </ul>
      </div>
     ))}
   </>
  );
 } else {
  return (
   <div className='flex justify-content-center align-items-center col-lg-12 mb-2 p-0'>
    <CircularProgress
     style={{
      marginTop: '110px',
      marginBottom: '110px',
      marginRight: '20px',
      marginLeft: '48%',
     }}
     size={20}
     color='#FFF'
    />
   </div>
  );
 }
};

export default PlanList;
