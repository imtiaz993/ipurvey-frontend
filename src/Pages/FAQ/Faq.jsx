import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import search from '../../Assets/Icon feather-search.png';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import { faq, layout } from '../../Query/queryFunctions';
import FaqList from './FaqList';
import './style.css';

const Faq = () => {
 const { data: FAQ } = useQuery('faq', faq, {
  refetchOnWindowFocus: false,
 });
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const [searchValue, setSearchValue] = useState('');
 const [faqData, setFaqData] = useState([]);

 useEffect(() => {
  setFaqData(FAQ?.FAQ);
 }, [FAQ]);

 const serachValueHandler = (e) => {
  if (e.target.value) {
   const filtredData = FAQ?.FAQ?.filter((el) =>
    el.question.toLowerCase().includes(e.target.value.toLowerCase())
   );
   setFaqData(filtredData);
  } else {
   setFaqData(FAQ?.FAQ);
  }
  setSearchValue(e.target.value);
 };

 if (FAQ && Layout) {
  return (
   <>
    <div className='Faq_container'>
     <div className='faq_md'>
      <div className='faq_sd'>
       <div className='sub_header_md'>
        <h4>{FAQ.title}</h4>
        <div className='faq_search_md'>
         <input
          type='text'
          placeholder='Search'
          value={searchValue}
          onChange={serachValueHandler}
         />
         <img src={search} alt='...' />
        </div>
       </div>
       <FaqList data={faqData} />
      </div>
     </div>
    </div>
    <Footer data={Layout} />
   </>
  );
 } else return <Loader />;
};
export default Faq;
