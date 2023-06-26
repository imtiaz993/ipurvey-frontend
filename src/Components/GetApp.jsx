import getApp from '../Assets/Group 4930@2x.png';
import arrow from '../Assets/Icon feather-arrow-rightw.png';
import store from '../Assets/App store Icons@2x.png';
import { useHistory } from 'react-router';

const GetApp = ({ data }) => {
 const history = useHistory();
 return (
  <div>
   <div className='home_commingsoon'>
    <div className='hc_box'>
     <div className='hcb_left'>
      <h4 className='lh-base'>
       {data?.sign_up_today?.title} <br />
      </h4>
      <p className='lh-base blue_para'>{data?.sign_up_today?.description}</p>
      <button
       className='sign_up_todayBtn'
       onClick={() => history.push('/signup')}
      >
       {data?.sign_up_today?.comming_soon} <img src={arrow} alt='' />
      </button>
      <div>
       <span>{data?.sign_up_today?.comming_soon}</span>
       <img src={store} alt='...' />
      </div>
     </div>
     <div className='hcb_right'>
      <img className='h_mob1' src={getApp} alt='...' />
     </div>
    </div>
   </div>
  </div>
 );
};

export default GetApp;
