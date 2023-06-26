import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import cokkie from '../Assets/undraw_cookie_love_ulvn_light.png';
import crosslight from '../Assets/Path 5674.png';
import { useHistory } from 'react-router';

const Cokkie = ({ data }) => {
 useEffect(() => {
  AOS.init({
   easing: 'ease',
  });
 }, []);

 const history = useHistory();
 const [show, setShow] = useState(false);

 const handleMoreInfo = () => {
  setShow(true);
  history.push('/privacy');
 };
 return (
  <div
   data-aos='fade-up'
   data-aos-duration='3000'
   className='cokkie_main_div'
   style={{
    display: show === true ? 'none' : 'block',
   }}
  >
   <div className='cokkie_div'>
    <p
     style={{ display: show === true ? 'none' : 'block' }}
     className='cross_cookie'
     src={crosslight}
     alt='...'
     onClick={() => {
      setShow(true);
     }}
    >
     &times;
    </p>

    <img className='cokkie_img' src={cokkie} alt='...' />
    <div className='cokkie_para'>
     <h5>{data?.cookie?.title}</h5>
     <p>{data?.cookie?.description}</p>
     <div className='cokkie_btn_div'>
      <button
       className='cus_btn1'
       style={{
        border: '1px solid white',
        backgroundColor: 'transparent',
        padding: '8px 18px',
        color: 'white',
       }}
       onClick={() => {
        handleMoreInfo();
       }}
      >
       More Information
      </button>
      <button
       className='cus_btn2 m-l'
       onClick={() => {
        setShow(true);
       }}
      >
       I Accept!
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Cokkie;
