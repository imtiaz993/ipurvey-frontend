import { useQuery } from 'react-query';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import SubNav from '../../Layout/SubNav';
import { career, layout } from '../../Query/queryFunctions';
import BeAPartForm from './BeAPartForm';
import Benifit from './Benifit';
import OurTeam from './OurTeam';
import './style.css';

const Career = () => {
 const { data: Career } = useQuery('career', career, {
  refetchOnWindowFocus: false,
 });
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });

 if (Layout && Career) {
  return (
   <>
    <div className='career_container'>
     <div className='career_md'>
      <SubNav head='Careers' />
      <BeAPartForm data={Career} />
      {Career.Benifits && <Benifit data={Career} />}
      {Career.team && <OurTeam data={Career} />}
     </div>
    </div>
    <Footer data={Layout} />
   </>
  );
 } else return <Loader />;
};

export default Career;
