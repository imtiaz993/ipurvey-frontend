import { useQuery } from 'react-query';
import Feed from 'instagram-feed-embed';
import fb from '../../Assets/Group 833@2x.png';
import insta from '../../Assets/Group 3428@2x.png';
import { blogpage } from '../../Query/queryFunctions';

const SocialFeed = () => {
 const { data: BlogsPage } = useQuery('blog-page', blogpage, {
  refetchOnWindowFocus: false,
 });

 return (
  <div className='socail_feed_conatiner'>
   <div className='social_feed_div'>
    <h4>
     <strong>{BlogsPage?.faceboo_feed}</strong>
    </h4>
    <iframe
     src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FiPurvey%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=136670628516723'
     width='340'
     height='500'
     style={{ border: 'none', overflow: 'hidden' }}
     scrolling='no'
     frameBorder='0'
     allowFullScreen={true}
     allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
    ></iframe>
    <button
     className='socail_button'
     onClick={() => window.open('https://www.facebook.com/ipurvey', '_blank')}
    >
     <img src={fb} alt='img' />
     <p>{BlogsPage?.follow_us_facebook}</p>
    </button>
    <h4>
     <strong>{BlogsPage?.insta_feed}</strong>
    </h4>
    <Feed userName='i_purvey' limit={12} width={320} maxContainerHeight={510} />
    <button
     onClick={() =>
      window.open('https://www.instagram.com/i_purvey/', '_blank')
     }
     className='socail_button insta'
    >
     <img src={insta} alt='img' />
     <p>{BlogsPage?.follow_on_intsa}</p>
    </button>
   </div>
  </div>
 );
};

export default SocialFeed;
