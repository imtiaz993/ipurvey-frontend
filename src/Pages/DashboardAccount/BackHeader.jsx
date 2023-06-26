import { Link } from 'react-router-dom';
import back from '../../Assets/Icon feather-arrow-right.png';
import './Style/backHeader.css';

const BackHeader = ({ head, link, onclick, isBtn }) => {
 return (
  <div className='backHeader_container'>
   <div className='backHead_md'>
    {!isBtn ? (
     <Link className='back_header_link' to={link}>
      <img src={back} alt='...' />
      <p>{head}</p>
     </Link>
    ) : (
     <button onClick={onclick} className='back_header_link bk_btn'>
      <img src={back} alt='...' />
      <p>{head}</p>
     </button>
    )}
   </div>
  </div>
 );
};

export default BackHeader;
