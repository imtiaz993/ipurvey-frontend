import { useLayoutEffect } from 'react';
import { useQuery } from 'react-query';
import rightImg from '../../Assets/undraw_contract_uy56.png';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import SubNav from '../../Layout/SubNav';
import { layout, terms } from '../../Query/queryFunctions';
import './Terms.css';
import TermsDetail from './TermsDetail';

const TermAndCond = () => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Terms } = useQuery('terms', terms, {
  refetchOnWindowFocus: false,
 });

 useLayoutEffect(() => {
  window.scrollTo(0, 0);
 }, []);
 if (Layout && Terms) {
  return (
   <div className='terms_and_cond_container'>
    <SubNav head={Terms.title} />
    <div className='mobileView_terms_top_img'>
     <img src={rightImg} alt='' />
    </div>
    <div className='terms_top_main'>
     <p className='mt-3 pre'>{Terms.content}</p>
    </div>
    <div className='terms_cond_main_div'>
     <div className='terms_ques_content_main'>
      <TermsDetail data={Terms} />
     </div>
     <div className='terms_two_div select_lang_div'>
      <div className='terms_two_img_box'>
       <img src={rightImg} alt='...' />
      </div>
     </div>
    </div>
    <Footer data={Layout} />
   </div>
  );
 } else return <Loader />;
};

export default TermAndCond;
