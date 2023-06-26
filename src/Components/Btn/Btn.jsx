import './Btn.css';

const Button = ({ className, value, onClick }) => (
 <div>
  <button onClick={onClick} className={`custom_Button ${className}`}>
   {value}
  </button>
 </div>
);

export default Button;
