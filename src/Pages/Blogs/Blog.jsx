import { useLayoutEffect } from 'react';
import { useQuery } from 'react-query';
import BlogCard from '../../Components/BlogComp/BlogCard';
import { BlogSlider } from '../../Components/BlogComp/BlogSlider';
import SocialFeed from '../../Components/BlogComp/SocialFeed';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import SubNav from '../../Layout/SubNav';
import { blogpage, blogs, layout } from '../../Query/queryFunctions';
import './Blog.css';

const Blog = () => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: BlogsPage } = useQuery('blog-page', blogpage, {
  refetchOnWindowFocus: false,
 });
 const { data: Blogs } = useQuery('blogs', blogs, {
  refetchOnWindowFocus: false,
 });

 useLayoutEffect(() => {
  window.scrollTo(0, 0);
 }, []);

 if (Layout && BlogsPage && Blogs) {
  return (
   <>
    <div className='blog_container'>
     <SubNav head='ipurvey Blog' />
     <div className='blog_main_div'>
      <div className='event_slider_div'>
       <BlogSlider data={BlogsPage} />
      </div>
      <div className='blog_card_socail_feed_div margin_top'>
       <BlogCard size='15' show data={Blogs} />
       <SocialFeed />
      </div>
     </div>
    </div>
    <Footer data={Layout} />
   </>
  );
 } else return <Loader />;
};

export default Blog;
