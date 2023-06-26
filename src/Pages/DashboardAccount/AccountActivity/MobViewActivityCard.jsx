const MobViewActivityCard = ({ data }) => {
 return (
  <div className='activiyCard_container'>
   <div className='activiyCard_md'>
    {data.map((val) => (
     <div className='mobView_activiyty_card' key={val.id}>
      <div className='activity_row'>
       <div className='activity_info'>
        <p className='tb_info_head'>DATE</p>
        <p className='tb_card_details'>{val.timestamp?.split(' ')[0]}</p>
       </div>
       <div className='activity_info'>
        <p className='tb_info_head'>TIME</p>
        <p className='tb_card_details'>{val.timestamp?.split(' ')[1]} UTC</p>
       </div>
      </div>
      <div className='activity_s_info'>
       <h6>ACTIVITY TYPE</h6>
       <p>{val.activityType} </p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default MobViewActivityCard;
