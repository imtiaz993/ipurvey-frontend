import { useLayoutEffect } from 'react';
import { useQuery } from 'react-query';
import aboutRec1 from '../../Assets/aboutimg.png';
import aboutRec2 from '../../Assets/Group 4947@2x.png';
import GetApp from '../../Components/GetApp';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import { about, layout } from '../../Query/queryFunctions';
import './About.css';

const About = () => {
 useLayoutEffect(() => {
  window.scrollTo(0, 0);
 }, []);

 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: About } = useQuery('about', about, {
  refetchOnWindowFocus: false,
 });

 if (Layout && About) {
  return (
   <>
    <div className='about_container'>
     <div className='about_content'>
      <div className='about_left_content1'>
       <h4 className='main_about_head'>{About.header?.title_1}</h4>
       <h2 className=' fw-bold about_head'>{About?.header?.title_2}</h2>
       <p className='about_para'>{About?.header?.description}</p>
      </div>
      <div className='about_right_content1'>
       <img src={aboutRec1} alt='img' />
      </div>
     </div>
     <div className='about_sec2'>
      <div className='about_content mt-5 '>
       <div className='about_left_content2'>
        <h2 className=''> {About?.body?.title}</h2>
        <p className=''>{About?.body?.description}</p>
       </div>
       <div className='about_right_content2'>
        <img src={aboutRec2} alt='img' />
       </div>
      </div>
     </div>
    </div>
    <GetApp data={Layout} btn head={About?.get_app} />
    <Footer data={Layout} />
   </>
  );
 } else return <Loader />;
};

export default About;
