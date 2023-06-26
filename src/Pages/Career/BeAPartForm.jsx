import email from '../../Assets/Icon ionic-ios-mail@2x.png';
// import { useState } from 'react';

const BeAPartForm = ({ data }) => {
 //  const [img, setImg] = useState('');
 //  const handleImageUpload = (e) => {
 //   const url = URL.createObjectURL(e.target.files[0]);
 //   setImg(url);
 //  };

 return (
  <div className='beA_part_container'>
   <div className='beA_part_md'>
    <div className='beA_part_left_md'>
     <h4>{data?.header?.heading}</h4>
     <p className='be_part_para'>{data?.header?.description}</p>
     <div className='email_div'>
      <img src={email} alt='' />
      <span className='email_span'> {data?.header?.email}</span>
     </div>
    </div>
    {/* <div className='beA_part_right_form_md'>
     <h4>Drop your resume!</h4>
     <div className='beA_part_form'>
      <form>
       <div className='hw_input'>
        <input type='text' placeholder='First Name' />
        <input type='text' placeholder='Last Name' />
       </div>
       <input type='email' placeholder='Email Address' />
       <input type='text' placeholder='Job Position Interested' />
       <div className='dragNdrop'>
        <label htmlFor='drag'>
         <input
          type='file'
          name='drag'
          id='drag'
          onChange={handleImageUpload}
          style={{ display: 'none' }}
         />
         {!img ? <img src={drag} alt='...' /> : null}
        </label>
        {img ? <img src={img} alt='...' /> : null}
       </div>
       <button>Send</button>
      </form>
     </div>
    </div> */}
   </div>
  </div>
 );
};

export default BeAPartForm;
