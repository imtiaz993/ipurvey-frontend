import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import SubNav from '../../Layout/SubNav';
import { layout, services } from '../../Query/queryFunctions';
import { API_URL } from '../../Utils/constants';
import './Service.css';

const Service = () => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Services } = useQuery('services', services, {
  refetchOnWindowFocus: false,
 });

 if (Layout && Services) {
  return (
   <>
    <SubNav head='Our Services' />
    <div className='service_main'>
     {Services?.block.map((block) => (
      <div className='sm_content sm_for'>
       <div className='sm_l sml_rev'>
        <h2>{block.title}</h2>
        <p>{block.description}</p>
        <Link to="/">
         <button className='cus_blue_btn'>Submit Travel Booking</button>
        </Link>
       </div>
       <div className='sm_r'>
        <img
         src={`${API_URL.CMS}${block?.image?.url}`}
         alt={block?.image?.name}
        />
       </div>
      </div>
     ))}
     {/* <div className='developer_sd'>
      <div className='pm_sections'>
       <div className='pm_left_sec'>
        <h5>{Services?.final_block?.title}</h5>
        <p>{Services?.final_block?.description}</p>
        <div className='learn_more_lin '>
         <Link className='link' to={Services?.final_block?.link_url}>
          {Services?.final_block?.link_text} <img src={arrow} alt='...' />
         </Link>
        </div>
        <div className='developers_btns mt-4'>
         <Link to={Services?.final_block?.button_url}>
          <button className='cus_blue_btn'>
           {Services?.final_block?.button_text}
          </button>
         </Link>
         <Link to='/contact'>
          <button className='cus_wht_btn'>Contact Us</button>
         </Link>
        </div>
       </div>
       <div className='pm_right_sec'>
        <img
         src={`${API_URL.CMS}${Services?.final_block?.image?.url}`}
         alt={Services?.final_block?.image?.name}
        />
       </div>
      </div>
     </div> */}
    </div>
    <Footer data={Layout} />
   </>
  );
 } else {
  return <Loader />;
 }
};

export default Service;
