import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { useEffect, useRef, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import calender from '../../Assets/Icon awesome-calendar-alt.png';
import errorIcon from '../../Assets/Icon material-error.png';
import headImg from '../../Assets/undraw_checking_boxes_2ibd.png';
import '../TravelClaim/TravelClaim.css';
import TryAgain from './TryAgain';

const DepartureDateForm = ({ data, proceed, refresh, setDisable }) => {
  const [error, setError] = useState('');
  const [openH, setOpenH] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [travelMode, setTravelMode] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTimeH, setDepartureTimeH] = useState();
  const [departureTimeM, setDepartureTimeM] = useState();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [_refresh, setUnderscoreRefresh] = useState(10000);
  const currentDate = moment(new Date());
  const inputElement = useRef(null);

  useEffect(() => {
    setUnderscoreRefresh(refresh);
  }, []);

  useEffect(() => {
    var { departure_date, departure_time } = JSON.parse(localStorage.getItem('travelModel'));
    if (departure_date && departure_time) {
      let [hours, minutes] = departure_time.split(":");
      setDepartureTimeH(hours)
      setDepartureTimeM(minutes)
      setDepartureDate(moment(departure_date))
    }
  }, [])

  useEffect(() => {
    inputElement.current.setSelectionRange(cursorPosition, cursorPosition);
  }, [departureDate, cursorPosition]);

  useEffect(() => {
    if (refresh > _refresh) {
      onSubmit();
    }
  }, [refresh]);

  const onInput = () => setCursorPosition(inputElement.current.selectionStart);

  useEffect(() => {
    var existing = JSON.parse(localStorage.getItem('travelModel'));
    setTravelMode(existing.travel_mode);
  }, []);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (
      departureDate === '' ||
      departureDate === undefined ||
      departureDate === null
    ) {
      isValid = false;
      errors['departureDate'] = 'Please select departure date.';
    } else {
      if (
        departureTimeH === undefined ||
        departureTimeH === 'Invalid date' ||
        departureTimeM === undefined ||
        departureTimeM === 'Invalid date'
      ) {
        isValid = false;
        errors['departureTime'] = 'Please enter a valid time.';
      } else {
        if (typeof departureDate === 'string') {
          isValid = false;
          errors['departureDate'] = 'Please enter a valid date.';
        } else {
          if (travelMode === 'F' && currentDate.diff(departureDate, 'years') >= 6) {
            isValid = false;
            setTryAgain(true);
            setDisable(true)
          } else if (
            travelMode === 'R' &&
            currentDate.diff(departureDate, 'days') >= 28
          ) {
            isValid = false;
            setTryAgain(true);
            setDisable(true)
          }
        }
      }
    }

    setError(errors);

    return isValid;
  };

  const setDepartureTimeFH = (value) => {
    setDepartureTimeH(moment(value).format('HH'));
    setError('');
    setTryAgain(false);
    setDisable(false)
    setOpenFH();
  };
  const setOpenFH = () => {
    setOpenH(!openH);
  };
  const setDepartureTimeFM = (value) => {
    setDepartureTimeM(moment(value).format('mm'));
    setError('');
    setTryAgain(false);
    setDisable(false)
    setOpenFM();
  };
  const setOpenFM = () => {
    setOpenM(!openM);
  };
  const onSubmit = () => {
    if (validate()) {
      var existing = JSON.parse(localStorage.getItem('travelModel'));
      existing.departure_date =
        departureDate !== '' &&
        departureDate !== undefined &&
        departureDate !== null &&
        moment(departureDate.toDate()).format('YYYY-MM-DD');
      existing.departure_time = departureTimeH + ':' + departureTimeM;
      localStorage.setItem('travelModel', JSON.stringify(existing));
      proceed();
    }
  };
  const backToDate = () => {
    setTryAgain(false);
  };

  return (
    <>
      <div
        className={
          tryAgain
            ? 'base-form-container base-form-container-error'
            : 'base-form-container'
        }
      >
        <div className='stepper_form_md'>
          <div className='stepper_form'>
            <img src={headImg} alt='...' />
            <h2>{data?.form?.departure}</h2>
            <div className='stp_inp'>
              <Datetime
                timeFormat={false}
                closeOnSelect={true}
                dateFormat='DD-MM-YYYY'
                inputProps={{
                  onInput,
                  ref: inputElement,
                  placeholder: 'Enter or select a date e.g. DD-MM-YYYY',
                }}
                value={departureDate}
                onChange={(date) => {
                  setDepartureDate(date);
                  setError('');
                  setDisable(false)
                  setTryAgain(false);
                }}
              />
              <img id='wierd-calender' src={calender} alt='...' />
            </div>
            {error.departureDate && (
              <div className='getError_md_start' id='center-err'>
                <img src={errorIcon} alt='...' />
                <p>{error.departureDate}</p>
              </div>
            )}
            <h2 className='pt-2'>{data?.form?.departure_time}</h2>
            <div className='pt-2'>
              <TimePicker
                open={openH}
                onOpen={setOpenFH}
                onClose={setOpenFH}
                onChange={setDepartureTimeFH}
                value={departureTimeH ? moment().set({ hour: departureTimeH }) : null}
                showMinute={false}
                showSecond={false}
                allowEmpty={false}
                className='timepicker'
                placeholder='HH'
                inputReadOnly

              />
              <span className='colon medium'>:</span>
              <TimePicker
                open={openM}
                onOpen={setOpenFM}
                onClose={setOpenFM}
                onChange={setDepartureTimeFM}
                showHour={false}
                showSecond={false}
                allowEmpty={false}
                className='timepicker'
                placeholder='MM'
                value={departureTimeM ? moment().set({ minute: departureTimeM }) : null}
                inputReadOnly
              />
            </div>
          </div>
          <div className='flex-container'>
            {error.departureTime && (
              <div className='getError_md_start'>
                <img src={errorIcon} alt='...' />
                <p>{error.departureTime}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='too-far-back'>
        {tryAgain && (
          <TryAgain data={data} backBtn={backToDate} travelMode={travelMode} />
        )}
      </div>
    </>
  );
};

export default DepartureDateForm;
