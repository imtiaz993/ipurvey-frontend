import { Link } from 'react-router-dom';
import arrow from '../../Assets/Icon feather-arrow-right@2x.png';
import { API_URL } from '../../Utils/constants';
import './card.css';

const BlogCard = ({ size, className, show, data }) => {
 return (
  <div className={`blog_card_container ${className}`}>
   {show ? <h3 className='blog_card_heading'>Blog Posts</h3> : null}
   <div className='blog_card_div'>
    {data?.blogs?.map((val) => (
     <div
      className='card blog_card'
      style={{ width: `${size}rem`, marginTop: '14.5px' }}
      key={val?.id}
     >
      <img
       src={`${API_URL.CMS}${val?.thumbnail.url}`}
       className='card-img-top'
       alt='...'
      />
      <div className='card_title_div'>
       <h6>
        <strong> {val?.title} </strong>
       </h6>
      </div>
      <div className='blog_data_div'>
       <p>{new Date(val?.createdAt).toDateString()}</p>
      </div>
      <div className='card-body blog_card_body'></div>
      <div className='read_more_div'>
       <Link className='read_link' to={`/blog/${val?.id}`}>
        Learn more <img className='right_arrow' src={arrow} alt='' />
       </Link>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default BlogCard;
