import { useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import SubNav from '../../Layout/SubNav';
import { layout, privacy } from '../../Query/queryFunctions';
import './Privacy.css';

const Privacy = () => {
 useLayoutEffect(() => {
  window.scrollTo(0, 0);
 }, []);
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Privacy } = useQuery('privacy', privacy, {
  refetchOnWindowFocus: false,
 });

 if (Layout && Privacy) {
  return (
   <div className='terms_and_cond_container'>
    <SubNav head={Privacy?.title} />
    <div className='terms_and_cond_main_div privacy_md'>
     <div className='terms_boxex_div'>
      {Privacy?.Paragraph?.map((para) => {
       return <ReactMarkdown>{para.content}</ReactMarkdown>;
      })}
     </div>
    </div>
    <Footer data={Layout} />
   </div>
  );
 } else return <Loader />;
};

export default Privacy;
