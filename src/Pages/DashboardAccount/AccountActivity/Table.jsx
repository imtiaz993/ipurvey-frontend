import '../Style/table.css';

const Table = ({ data, onClick }) => {
 return (
  <div className='table_container'>
   <table className='db_table tb_page_table acc_tble'>
    <thead>
     <th>DATE</th>
     <th>TIME</th>
     <th>ACTIVITY TYPE</th>
     <th>IP ADDRESS</th>
    </thead>
    <tbody>
     {data.map((val, i) => (
      <tr key={i} onClick={() => onClick(val)}>
       <td>{val.timestamp.split(' ')[0]}</td>
       <td>{val.timestamp.split(' ')[1]}</td>
       <td>{val.activityType}</td>
       <td>{val.ip}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default Table;
