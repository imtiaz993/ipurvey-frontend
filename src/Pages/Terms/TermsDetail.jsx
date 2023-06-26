import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import arrow from '../../Assets/Path 5677@3x.png';

const TermsDetail = ({ data }) => {
 let [trans, setTrans] = useState([data?.term[0]]);

 const handleTransalte = (event) => {
  let filter = data?.term.filter((val) => val.id === event);
  setTrans(filter);
  if (trans.length && filter[0].id === trans[0].id) {
   setTrans([]);
  }
 };

 return (
  <div className='terms_detail_contianer'>
   <div className='terms_dtl_md'>
    <div className='termsDetail_box'>
     <div className='termsQues_list'>
      <h4>Contents</h4>
      <ul className='tersmQues_ul'>
       {data?.term.map((val, index) => (
        <li key={index}>
         <div
          className={`termQ
                       ${
                        trans.length
                         ? trans[0].id === val.id
                           ? 'active_term'
                           : ''
                         : null
                       }
                       `}
          onClick={() => handleTransalte(val.id)}
         >
          <p>{val.title}</p>
          {trans.length ? (
           val.id === trans[0].id ? (
            <img src={arrow} alt='...' />
           ) : null
          ) : null}
         </div>
         {trans.length
          ? trans[0].id === val.id
            ? trans.map((val, index) => (
               <div key={index} className='mobileView_termsQues_detail'>
                <h6>{val.title}</h6>
                <ReactMarkdown>{val.description}</ReactMarkdown>
               </div>
              ))
            : null
          : null}
        </li>
       ))}
      </ul>
     </div>
     <div className='terms_quesDetail_box'>
      {trans.map((val, index) => (
       <div key={index} className='termQues_detail_content'>
        <h6>{val.title}</h6>
        <p>
         <ReactMarkdown>{val.description}</ReactMarkdown>
        </p>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};

export default TermsDetail;
