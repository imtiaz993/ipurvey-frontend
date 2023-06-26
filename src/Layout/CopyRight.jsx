import { Link } from 'react-router-dom';
import fb from '../Assets/Group 2430@2x.png';
import insta from '../Assets/Group 2432@2x.png';
import link from '../Assets/Group 3406@2x.png';
import twiter from '../Assets/Group 3407@2x.png';
import youtube from '../Assets/Group 3315@2x.png';
import path from '../Assets/Path 4443.png';
import copy from '../Assets/Icon metro-copyright.png';
import logo from '../Assets/ssl.png';

const CopyRight = ({ data }) => {
 return (
  <div className='copy_right_container'>
   <div className='copy_right_main_div'>
    <div className='contact_link_ul_'>
     <a
      href='https://www.namecheap.com/security/ssl-certificates/'
      target='_blank'
     >
      <img className='d-block mb-3' src={logo} />
     </a>
     <h5>{data?.footer?.connect}</h5>
     <img className='contct_path_line' src={path} alt='' />
     <ul className='social_links'>
      <li>
       <a target='_blank' href={data?.footer?.facebook_url}>
        <img src={fb} alt='...' />
       </a>
      </li>
      <li>
       <a target='_blank' href={data?.footer?.instagram_url}>
        <img className='insta_icon' src={insta} alt='...' />
       </a>
      </li>
      <li>
       <a target='_blank' href={data?.footer?.youtube_url}>
        <img src={youtube} alt='...' />
       </a>
      </li>
      <li>
       <a target='_blank' href={data?.footer?.twitter_url}>
        <img src={twiter} alt='...' />
       </a>
      </li>
      <li>
       <a target='_blank' href={data?.footer?.linkedin_url}>
        <img src={link} alt='...' />
       </a>
      </li>
     </ul>
    </div>
    <div className='term_link_div'>
     <div>
      <Link className='foter_link' to='/privacy'>
       {' '}
       Privacy policy{' '}
      </Link>
      |
      <Link className='foter_link' to='/terms'>
       {' '}
       Terms and Conditions{' '}
      </Link>
     </div>
    </div>
   </div>
   <div className='copy_right_div'>
    <p>
     <img src={copy} alt='' /> {data?.footer?.copyrights_text}
    </p>
   </div>
  </div>
 );
};

export default CopyRight;
