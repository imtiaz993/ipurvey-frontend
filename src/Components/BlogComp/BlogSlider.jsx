import Slider from 'react-slick';
import { API_URL } from '../../Utils/constants';
import '../Btn/Btn.css';

export const BlogSlider = ({ data }) => {
 const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
   {
    breakpoint: 1024,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
     infinite: true,
    },
   },
   {
    breakpoint: 800,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
     initialSlide: 2,
    },
   },
   {
    breakpoint: 480,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: true,
    },
   },
  ],
 };
 return (
  <Slider {...settings} className='blog_slick_slidr'>
   {data?.slider.map((slide) => {
    return (
     <div>
      <img
       className='slider_img'
       src={`${API_URL.CMS}${slide?.image?.url}`}
       alt='img'
      />
      <div className='upcomin_head_div slider_absolute'>
       <div>
        <h6 className='upcoming_head'>
         <strong>{slide?.heading}</strong>
        </h6>
        <p className='upcoming_data'>{slide?.description}</p>
        <a href={slide?.button?.link}>
         <button className={`custom_Button upcoming_btn`}>
          {slide?.button?.text}
         </button>
        </a>
       </div>
      </div>
     </div>
    );
   })}
  </Slider>
 );
};
