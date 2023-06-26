const ShowDetail = ({ detailData, reportBtn }) => {
 return (
  <div className='showDetail_container'>
   <div className='showDetail_md'>
    <h6>{detailData.activityType}</h6>
    <div className='sd_dateTime'>
     <p>{detailData.timestamp?.split(' ')[0]}</p>
     <p>{detailData.timestamp?.split(' ')[1]}</p>
    </div>
    <h6 className='sd_sub_head'>Description</h6>
    <p className='sd_detail_para'>{detailData.activityDetail}</p>
    {/* {reportBtn ? (
     <div className='botm_btn'>
      <button className='cus_blue_btn'>
       Report Activity
      </button>
     </div>
    ) : null} */}
   </div>
  </div>
 );
};

export default ShowDetail;
