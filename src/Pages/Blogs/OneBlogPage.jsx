import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SocialFeed from '../../Components/BlogComp/SocialFeed';
import Loader from '../../Components/Loader';
import SubNav from '../../Layout/SubNav';
import { API_URL } from '../../Utils/constants';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SelectBlog = () => {
 useLayoutEffect(() => {
  window.scrollTo(0, 0);
 }, []);

 const { id } = useParams();
 const [blogData, setBlogData] = useState([]);

 const fetchBlog = async () => {
  const res = await axios.get(`${API_URL.CMS}/blogs/` + id);
  setBlogData(res.data);
 };

 useEffect(() => {
  fetchBlog();
 }, [id]);
 if (blogData) {
  return (
   <div>
    <div className='blog_container'>
     <SubNav head='ipurvey Blogs' />
     <div className='blog_main_div'>
      <div className='select_blog_para_data'>
       <h5>
        <strong>{blogData?.title}</strong>
       </h5>
       <div className='one_blog_data_div'>
        <p>{new Date(blogData?.createdAt).toDateString()}</p>
       </div>
      </div>
      <div className='blog_card_socail_feed_div'>
       <div className='select_blog_more_main_div'>
        <Swiper
         spaceBetween={50}
         slidesPerView={1}
         navigation
         pagination={{ clickable: true }}
         className='swiper_slider_blog'
        >
         {blogData?.gallery?.map((data) => (
          <SwiperSlide>
           <img
            width='100%'
            src={`${API_URL.CMS}${data?.formats?.large?.url ?? data?.url}`}
           />
          </SwiperSlide>
         ))}
        </Swiper>
        <div className='select_blog_more_para'>
         <ReactMarkdown>{blogData?.content}</ReactMarkdown>
        </div>
       </div>
       <SocialFeed />
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};

export default SelectBlog;
